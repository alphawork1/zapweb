yum.define([
	PI.Url.create('Condominio', '/search/result.html'),
	PI.Url.create('Condominio', '/search/result.css'),
	PI.Url.create('Condominio', '/historico/modal.js'),
	PI.Url.create('Condominio', '/historico/model.js')
], function(html){

	Class('Condominio.Search.Result').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);
			
			this.rank = new UI.Rating({
				readOnly: true
			});
		},
		
		viewDidLoad: function(){
			
			this.rank.set( this.condominio.Rank );
			
			this.base.viewDidLoad();
		},
		
		events: {
		
			'@historico click': function(){
				var self = this;
				var modal = new Condominio.Historico.Modal({
					model: new Condominio.Historico.Model({
						Condominio: this.condominio
					})
				});
				
				modal.render( this.view.element );
				
				modal.open();
				
				modal.event.listen('close', function(){
					self.rank.set(modal.model.Rank);
				});
			}
		}

	});

});