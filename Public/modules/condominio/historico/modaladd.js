yum.define([
    PI.Url.create('Condominio', '/historico/modaladd.html')    
], function(html){

    Class('Condominio.Historico.ModalAdd').Extend(UI.Modal).Body({

        instances: function(){
            var self = this;
            
            this.view.inject({
                title: 'Adicionar Contato',
                body: html
            });
            
			this.data = new UI.DateBox({
				dataModel: 'Data',
				placeholder: 'Data'
			});
			
			this.proximo = new UI.DateBox({
				dataModel: function (model, method) {
                    if(method == 'get'){
                        return model.ProximoContato;
                    }else{
                        model.setProximoContato( self.proximo.get(), self.hora.get() );
                    }
                },
				placeholder: 'Data'
			});
			
			this.hora = new UI.TextBox({
				placeholder: '00:00',
				mask: 'hora'
			});
			
			this.descricao = new UI.TextArea({
				dataModel: 'Descricao',
				placeholder: 'Descrição',
				autosize: true,
				height: '37px'
			});
			
			this.rank = new UI.Rating({
				dataModel: 'Rank'
			});
            
            this.salvar = new UI.Button({
                label: 'Adicionar',
                iconLeft: 'fa fa-plus',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
        },
        
        viewDidLoad: function(){            
			this.data.set( Lib.DataTime.Now().getDateStringFromFormat('dd/MM/yyyy') );
			
            this.base.viewDidLoad();
        },
		
		isValid: function(model){
			var s = this.injectViewToModel(model);
			var data = this.data.get();
			var proximo = this.proximo.get();
			
			if(data.length > 0 && proximo.length > 0){
				var d1 = new Lib.DataTime(data, 'dd/MM/yyyy');
				var d2 = new Lib.DataTime(proximo, 'dd/MM/yyyy');
				
				if(d1.compareTo(d2) < 0){
					s.status = false;
                    s.messages.push('A data do próximo contato deve ser maior que a data informada');
				}
			}
            
            return s;
		},
		
		clear: function(){
			this.data.set('');
			this.proximo.set('');
			this.descricao.set('');
			this.rank.set(0);
		},
        
        events: {
        
            '{salvar} click': function(){
                var self = this;
                var s = this.isValid( this.model );
                
                if(!s.status){
                    Alert.error('Não foi possível', s.messages.join('<br>'));
                    return;
                }
                
                this.saveModel( this.model ).ok(function(){
					self.close();
				});
            }
        }

    });

});