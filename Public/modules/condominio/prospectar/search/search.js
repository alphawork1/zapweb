yum.define([
    PI.Url.create('Condominio', '/prospectar/search/search.html'),    
    PI.Url.create('Condominio', '/prospectar/search/search.css'),
    PI.Url.create('Condominio', '/prospectar/search/result.js') ,    
    
    PI.Url.create('Unidade', '/search/textbox.js')
], function(html){

    Class('Condominio.Prospecto.Search').Extend(UI.Composer).Body({

        instances: function(){
            this.title = 'Pesquisar Unidade';
            this.view.inject({
                title: 'Pesquisa Condominio',
                body: html
            });
            
            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false
            });

            this.condominios = [];

            this.pesquisarCondominios = new UI.Button({
                label: 'Pesquisar',
                iconLeft: 'fa fa-search',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.model = new Condominio.Model();            
        },
        
        viewDidLoad: function(){
            
            this.view.resultset.slimScroll({
                height: '400px'
            });

            this.base.viewDidLoad();
        },
        
        clear: function(){
            for(var i in this.condominios){
                this.condominios[i].destroy();
            }
            
            this.condominios = [];
            
            this.view.result.html('');
        },
        
        popule: function(condominios){
            var self = this;
            this.clear();
                        
            for(var i in condominios){
                var item = new Condominio.Prospectar.Search.Result({
                    condominio: condominios[i]
                });
                
                item.render( this.view.result );
                
                item.event.listen('click', function (condominio) {
                    
                    setTimeout(function(){
                        self.event.trigger('select', condominio);                        
                    }, 700);
                    
                    self.close();
                });
                
                this.condominios.push(item);
            }
            
            if( condominios.length == 0 ){
                this.view.result.html('<div class="app-result-empty">Nenhum resultado</div>');
            }
        },
        
        events: {
        
            '{pesquisarCondominios} click': function(){
                var self = this;
                var unidade = this.unidade.get() || {};
                
                this.pesquisarCondominios.setLabel('Pesquisando').anime(true).lock();
                
                this.model.prospectos( unidade.Id || 0  ).ok(function(condominios){
                    self.popule( condominios );
                }).done(function(){
                    self.pesquisarCondominios.setLabel('Pesquisa').anime(false).unlock();
                });
            },
        
            '.condominio-prospectar-search-result click': function(e){
                this.view.element.find('.condominio-prospectar-search-result').removeClass('condominio-prospectar-search-result-selected');
                $(e).toggleClass('condominio-prospectar-search-result-selected');
            }
        }

    });

});