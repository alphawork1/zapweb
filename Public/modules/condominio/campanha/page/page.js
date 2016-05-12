yum.define([
	PI.Url.create('Condominio', '/campanha/page/page.html'),
	// PI.Url.create('Condominio', '/campanha/page/page.css')
], function(html){

	Class('Condominio.Campanha.Page').Extend(PI.Page).Body({

		instances: function(){
			this.view = new Mvc.View(html);
			
			this.dataInicio = new UI.DateBox({
				dataModel: 'DataInicio',
				placeholder: 'Data'
			});
			
			this.dataFim = new UI.DateBox({
				dataModel: 'DataFim',
				placeholder: 'Data'
			});
			
			this.horaInicio = new UI.TextBox({
				dataModel: 'HoraInicio',
				mask: 'hora',
				placeholder: 'Horário'
			});
			
			this.horaFim = new UI.TextBox({
				dataModel: 'HoraFim',
				mask: 'hora',
				placeholder: 'Horário'
			});
			
			this.valorAVista = new UI.TextBox({
				dataModel: function (model, method, value) {
                    if (method == 'set') {
                        model.ValorAVista = PI.Convert.RealToDolar(value);
                    } else {
                        return PI.Convert.DolarToReal(model.ValorAVista);
                    }
                },
				mask: 'financeira',
				placeholder: 'R$ 0,00',
			});
			
			this.valorCheque = new UI.TextBox({				
				dataModel: function (model, method, value) {
                    if (method == 'set') {
                        model.ValorCheque = PI.Convert.RealToDolar(value);
                    } else {
                        return PI.Convert.DolarToReal(model.ValorCheque);
                    }
                },
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.valorDuplex = new UI.TextBox({
				dataModel: function (model, method, value) {
                    if (method == 'set') {
                        model.Acrescimo = PI.Convert.RealToDolar(value);
                    } else {
                        return PI.Convert.DolarToReal(model.Acrescimo);
                    }
                },
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.desconto = new UI.TextBox({
				dataModel: function (model, method, value) {
                    if (method == 'set') {
                        model.Desconto = PI.Convert.RealToDolar(value);
                    } else {
                        return PI.Convert.DolarToReal(model.Desconto);
                    }
                },
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
            this.anexos = new Arquivo.Painel({
				extensions: ['docx'],
                dataModel: 'Anexos'
            });
			
            this.salvar = new UI.Button({
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.excluir = new UI.Button({                
                label: 'Excluir',
                iconLeft: 'fa fa-times',
                classes: 'vermelho',
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
			
			this.title = 'Nova Campanha';
		},
		
		viewDidLoad: function(){
			var self = this;
			
			if(this.model.isNotNew()){
				
				this.breadcumb.setTitle('Editar Campanha');
				
				this.model.get().ok(function(model){
					self.injectModelToView( model );
				}).error(function(message){
					Alert.error('Não foi possível', message);
				});
				
			}else{
				this.excluir.hide();
			}
			
			this.base.viewDidLoad();
		},
		
		events: {
		
			'{salvar} click': function(){				
				
				this.saveModel(this.model).ok(function(model){
					EventGlobal.trigger('added::campanha', model);
					window.history.back();
				});
				
			},

            '{excluir} click': function(){
                var self = this;  

                Confirm.show('Atenção', 'Tem certeza que deseja excluir?<br/>Esta operação não poderá ser desfeita', function(b){
                    
                    if (b) {
                        self.excluir.setLabel('Excluindo ...').lock();
                        self.model.excluir().ok(function(model){

							EventGlobal.trigger('removed::campanha', model);                            
                            window.history.back();

                        }).error(function(message){
                            Alert.show('Não foi possível', message);
                            self.excluir.setLabel('Excluir').unlock();
                        });
                    };

                });
            }
		}

	});

});