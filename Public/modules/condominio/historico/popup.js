yum.define([
	PI.Url.create('Condominio', '/historico/popup.html'),
	PI.Url.create('Condominio', '/historico/popup.css')
], function(html){

	Class('Condominio.Historico.Popup').Extend(UI.Popup).Body({

		instances: function(){
			this.view.inject({
				content: html
			});
			
			this.rank = new UI.Rating({
				dataModel: 'Rank'				
			});
			
			this.data = new UI.DateBox({
				dataModel: 'Data',
				placeholder: 'Data'
			});
			
			this.proximo = new UI.DateBox({
				dataModel: 'ProximoContato',
				placeholder: 'Próximo Contato'
			});
			
			this.hora = new UI.TextBox({
				dataModel: function(model, method, value){
					if(method == 'get'){
						return model.ProximoContatoDataTime.getDateStringFromFormat('hh:mm');
					}else{
						if(value.length > 0){							
							model.ProximoContato += ' ' + value + ':00';
						}
					}
				},
				placeholder: '00:00',
				mask: 'hora'
			});
			
			this.descricao = new UI.TextArea({
				dataModel: 'Descricao',
				placeholder: 'Descrição',
				autosize: true
			});
			
			this.__salvar = new UI.Button({
				classes: 'verde',
				label: 'Salvar'
			});
			
			this.__cancelar = new UI.Button({
				classes: 'cinza',
				label: 'Cancelar'
			});
			
			this.autoclose = false;
			
			this.position = 'left::top';
		},
		
		viewDidLoad: function(){
			this.view.header.hide();
			
			this.base.viewDidLoad();
		},
		
		clear: function(){
			this.data.set('');
			this.proximo.set('');
			this.descricao.set('');
			this.rank.reload();	
		},
		
		events: {
		
			'{__salvar} click': function(){
				var self = this;
				var model = new Condominio.Historico.Model({
					Condominio: this.model.Condominio
				});

				this.saveModel( model, this.__salvar ).ok(function(historico){
					self.clear();
					
					self.event.trigger('added', historico);
					
					self.hide();
				});
			},
			
			'{__cancelar} click': function(){
				this.hide();
			}
			
		}

	});

});