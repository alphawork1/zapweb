yum.define([
	PI.Url.create('Condominio', '/campanha/painel.html'),
	PI.Url.create('Condominio', '/campanha/painel.css'),
	PI.Url.create('Condominio', '/campanha/item.js'),
	PI.Url.create('Condominio', '/campanha/modal/modal.js'),
], function(html){

	Class('Condominio.Campanha.Painel').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);
			
			this.gerar = new UI.Button({
				iconLeft: 'fa fa-plus',
				label: 'Nova Campanha'
			});
			
			this.model = new Condominio.Campanha.Model();
		},
		
		load: function(condominio){
			this.model.Condominio = condominio;
			
			this.refresh();
		},
		
		refresh: function(){
			var self = this;
			
			this.model.all( this.model.Condominio.Id ).ok(function(campanhas){
				self.popule(campanhas);
				console.log(campanhas);
			});
		},
		
		popule: function(campanhas){
			
			this.view.results.html('');
			
			for (var i = 0; i < campanhas.length; i++) {
				var m = campanhas[i];
				this.add(m);
			}
		},
		
		add: function(campanha){
			var item = new Condominio.Campanha.Item({
				campanha: campanha
			});
			
			item.render( this.view.results );
		},
		
		events: {
		
			'{gerar} click': function(){
				PI.Url.Hash.to('Condominio/Gerar/Campanha/' + this.model.Condominio.Id);
			},
			
			'{EventGlobal} added::campanha': function(campanha){
				this.refresh();
			},
			
			'{EventGlobal} removed::campanha': function(campanha){
				this.refresh();
			}		
		
			// '{gerar} click': function(){
			// 	var modal = new Condominio.Campanha.Modal();
				
			// 	modal.render( this.view.element );
				
			// 	modal.open();
			// }
		}

	});

});