yum.define([
    
], function(html){

    Class('Variavel.PainelItem').Extend(Mvc.Component).Body({

        instances: function(){
            // this.view = new Mvc.View('<tr> <td style="text-align: left; width: 25%">@{this.variavel.Nome}</td> <td at="component"></td> <td>@{this.variavel.Underscore}</td> </tr>');
            this.view = new Mvc.View('<div class="form-group col-sm-3"> <span style="text-align: left; width: 25%">@{this.variavel.Nome}</span> <span at="component"></span> </div>');
        },
        
        init: function(){
            
            if(this.variavel.Tipo == Variavel.Tipo.FORMULA){
                this.component = new UI.TextBox({                    
                    
                }); 
            }
            
            if(this.variavel.Tipo == Variavel.Tipo.MOEDA){
                this.component = new UI.TextBox({
                    placeholder: 'R$ 0,00',
                    mask: 'financeira',
                    dataModel: function (model, method, value) {
                        if (method == 'set') {
                            model.Valor = PI.Convert.RealToDolar(value);
                        } else {
                            return PI.Convert.DolarToReal(model.Valor);
                        }
                    },
                    style: {
                        'text-align': 'right',
                        'width': '120px'
                    },
                }); 
            }
                        
            if(this.variavel.Tipo == Variavel.Tipo.DATA){
                this.component = new UI.DateBox({
                    placeholder: 'Data',
                    dataModel: 'Data',
                    style: {
                        'width': '120px'
                    }
                });
            }
            
            if(this.variavel.Tipo == Variavel.Tipo.HORA){
                this.component = new UI.TextBox({
                    placeholder: '00:00',
                    mask: 'hora',
                    style: {
                        'width': '65px'
                    }
                });
            }
            
            if(this.variavel.Tipo == Variavel.Tipo.TEXTO){
                this.component = new UI.TextBox();
            }
            
        },
        
        viewDidLoad: function(){            
            this.component.set( this.variavel.Valor );
            
            this.base.viewDidLoad();
        },
        
        get: function(){
           var v = new Variavel.Model({
               Id: this.variavel.Id,
               Valor: this.component.get()
           });
           
           return v;
        },
        
        set: function(variavel){
            this.component.set( variavel.Valor );
        },

    });

});