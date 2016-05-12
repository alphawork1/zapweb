yum.define([
	PI.Url.create('Administradora', '/page/page.html'),
	PI.Url.create('Administradora', '/page/page.css')
], function (html) {

    Class('Administradora.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = new UI.TextBox({
                placeholder: 'Nome do Síndico',
                dataModel: 'Nome'
            });

            this.represetante = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Representante'
            });

            //endereco
            this.endereco = new Endereco.Painel({
                dataModel: 'Endereco'
            });
            
            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.telefone = new Telefone.Painel({
                dataModel: 'Telefones'
            });
            
            this.salvar = new UI.Button({
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

			this.qs = PI.Url.Hash.getQueryJson();
            
            this.title = 'Administradora';
        },

        viewDidLoad: function () {
            var self = this;
            app.home.setTitle('Adicionar Administradora');
            
            if(this.qs.nome != undefined){
                this.nome.set( this.qs.nome );
            }
            
            if(this.model.isNotNew()){
                this.model.get().ok(function(model){
                    self.injectModelToView(model);
                });
            }
            
            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this;
                
                this.saveModel( this.model ).ok(function (model) {
                    
                    if(self.qs.returnPage){
                        EventGlobal.trigger('administradora::save', model);
                        window.history.back();
                    }else{
                        PI.Url.Hash.to('!Administradora/Editar/' + model.Id);
                        Alert.info('Sucesso', 'Administradora adicionada com sucesso!');    
                    }                    
                    
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});