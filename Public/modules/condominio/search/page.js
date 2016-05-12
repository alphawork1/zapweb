yum.define([
	PI.Url.create('Condominio', '/search/page.html'),
    PI.Url.create('Condominio', '/search/impressao.html'),
	PI.Url.create('Condominio', '/search/page.css'),
	PI.Url.create('Condominio', '/search/impressao.css'),
	PI.Url.create('Condominio', '/search/result.js'),
    PI.Url.create('Util', '/lineselect/lineselect.js')
], function (html, printHtml) {

    Class('Condominio.Search.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = new UI.TextBox({
                placeholder: 'Nome do condomínio',
                dataModel: 'Nome'
            });

            this.administradora = new Administradora.TextBox({
                dataModel: 'Administradora'
            });

            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false,
                dataModel: 'Unidade'
            });
            
            this.ultimaCampanha = new UI.DateBox({
                placeholder: 'Última Campanha',
                dateModel: 'DataUltimaCampanha'
            });

            //endereco
            this.endereco = new Endereco.Painel({
                dataModel: 'Endereco'
            });

            this.rating = new UI.Rating({
                cancel: true,
                dataModel: 'Rank'
            });

            this.pesquisar = new UI.Button({
                label: 'Pesquisar',
                iconLeft: 'fa fa-search',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.lineselect = new Util.LineSelect();

            this.imprimir = new UI.Button({
                label: 'Imprimir',
                iconLeft: 'fa fa-print',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

            this.addNew = new UI.Button({
                label: 'Adicionar Filtro',
                iconLeft: 'fa fa-plus',
                classes: 'cinza'
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.model = new Condominio.Model();
            
            this.title = 'Pesquisar Condomínio';
            
            this.condominios = [];
        },

        viewDidLoad: function () {
            app.home.setTitle('Pesquisar Condomínio');

            this.imprimir.hide();

            this.lineselect.showOnClick(this.addNew);

            this.lineselect.add('Nome', this.view.nome, true)
                           .add('Administradora', this.view.administradora, true)
                           .add('Unidade', this.view.unidade)
                           .add('Última Campanha', this.view.ultimaCampanha)
                           .add('Endereço', this.view.endereco);

            this.base.viewDidLoad();
        },
        
        popule: function(condominios){            
            this.condominios = condominios;
            
            this.view.results.html('');
                        
            for (var i = 0; i < condominios.length; i++) {
                var item = new Condominio.Search.Result({
                    condominio: condominios[i]
                });
                
                item.render( this.view.results );
            }
            
            if(condominios.length == 0){
                this.view.results.html('<div class="condominio-search-empty">Nenhum resultado encontrado</div>');
            }else{                
                this.imprimir.show();            
            }
        },

        search: function () {
            var self = this;

            this.imprimir.hide();

            this.pesquisar.setLabel('Pesquisando ...').lock().anime(true);

            this.model.all().ok(function (condominios, paging) {
                self.popule(condominios);                
            }).done(function(){
                self.pesquisar.setLabel('Pesquisar').unlock().anime(false);
            });
        },
        
        createContentPrint: function(condominios){
            var view = Mvc.Helpers.prepare(condominios, printHtml).toView();
            console.log(condominios);
            this.view.printContent.html( view );
            
            window.print();
        },

        events: {

            '{pesquisar} click': function(){

                this.injectViewToModel(this.model, {
                    validate: false
                });

                this.search();
            },
            
            '{imprimir} click': function(){
                var self = this;
                var arr = [];
                
                for(var i in this.condominios){
                    arr.push(this.condominios[i].Id);
                }                
                
                this.imprimir.setLabel('Gerando ...').lock().anime(true);
                
                this.model.imprimir( arr.join(',') ).ok(function(condominios){
                    self.createContentPrint( condominios );
                }).done(function(){
                    self.imprimir.setLabel('Imprimir').unlock().anime(false);
                });
                
            }

        }

    });

});