yum.define([
    PI.Url.create('Variavel', '/painel/painel.html'),    
    PI.Url.create('Variavel', '/painel/item.js'),
    
    PI.Url.create('Variavel', '/model.js')
], function(html){

    Class('Variavel.Painel').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View(html);
            
            this.model = new Variavel.Model();
            
            this.items = [];
                  
            this.add = new UI.Button({
                label: 'Novo',
                iconLeft: 'fa fa-plus',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });            
                  
            this.salvar = new UI.Button({
                label: 'Salvar Alterações',
                iconLeft: 'fa fa-check',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });            
        },
        
        viewDidLoad: function(){
            var self = this;
            
            this.model.all().ok(function(variaveis){
                self.popule( variaveis );
            });
            
            this.base.viewDidLoad();
        },
        
        clear: function(){
            for(var i in this.items){
                this.items[i].destroy();
            }
            
            this.items = [];
            
            this.view.tbody.html('');
        },

        popule: function(variaveis){
            this.clear();
            
            for(var i in variaveis){
                var item = new Variavel.PainelItem({
                    variavel: variaveis[i]
                });
                
                item.render( this.view.tbody );
                
                this.items.push( item );
            }
        },
        
        get: function(){
            var arr = [];
            
            for(var i in this.items){
                arr.push( this.items[i].get() );
            }
            
            return arr;
        },
        
        set: function(variaveis){
            for(var i in variaveis){
                var v = variaveis[i];
                
                for(var j in this.items){
                    var vv = this.items[j];
                    
                    if(vv.variavel.Id == v.Id){
                        vv.set( v );
                        break;
                    }
                    
                }
            }
                                  
        },
        
        events: {
        
            '{add} click': function(){
                
            },
            
            '{salvar} click': function(){
                
            },
        }

    });

});