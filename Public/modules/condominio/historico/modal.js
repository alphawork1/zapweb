yum.define([
	PI.Url.create('Condominio', '/historico/modal.html'),
	PI.Url.create('Condominio', '/historico/modal.css'),
	PI.Url.create('Condominio', '/historico/row.js'),
	PI.Url.create('Condominio', '/historico/rowadd.js')
], function(html){

	Class('Condominio.Historico.Modal').Extend(UI.Modal).Body({

		instances: function(){
			this.view.inject({
				title: 'Contatos',
				body: html
			});
			
			this.anime = new UI.Anime({
				showing: true,
				label: 'Carregando ...'
			});
			
			this.salvar = new UI.Button({
				classes: 'verde',
				label: 'Salvar',
				style: {
					display: 'inline-block'
				}
			});
			
			this.cancelar = new UI.Button({
				classes: 'cinza',
				label: 'Cancelar',
				style: {
					display: 'inline-block'
				}
			});
			
			this.width = '850px';
			
			this.isShowAdd = true;
		},
		
		init: function(){
			
			if(this.isShowAdd){
				this.newrow = new Condominio.Historico.TableRowNew({
					dataModel: 'model'
				});	
			}
			
		},
		
		viewDidLoad: function(){			
			this.loadAndPopule();
			
			if(this.isShowAdd === false){
				this.salvar.hide();
			}
			
			this.base.viewDidLoad();
		},
		
		loadAndPopule: function(){
			var self = this;
			
			this.model.all( this.model.Condominio.Id ).ok(function(historicos){
				self.popule(historicos);
			});
		},
		
		popule: function(historicos){
			
			this.view.tbody.html('');			
			
			for (var i = 0; i < historicos.length; i++) {
				var h = historicos[i];
				
				this.addRow(h);
			}
			
			this.view.containerTable.scrollTop(100000);
		},
		
		addRow: function(historico){
			var row = new Condominio.Historico.TableRow({
				historico: historico
			});

			row.render( this.view.tbody );
		},
		
		close: function(){
			this.base.close();
			this.event.trigger('close', this.model);
		},
		
		events: {
		
			'{salvar} click': function(){
				var self = this;
								
				this.saveModel( this.model ).ok(function(){
					self.close();
				});
			},
			
			'{cancelar} click': function(){
				this.close();
			}
		}

	});

});