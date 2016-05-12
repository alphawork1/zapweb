yum.define([
	PI.Url.create('Condominio', '/historico/row.html'),
	// PI.Url.create('Condominio', '/historico/row.css')
], function(html){

	Class('Condominio.Historico.TableRow').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);
			this.rank = new UI.Rating({
				readOnly: true
			});
		},
		
		viewDidLoad: function(){			
			this.rank.set( this.historico.Rank );
			
			this.base.viewDidLoad();
		},
		
		evidence: function(){
			this.view.element.evidence({
				start: '#ffffff',
				end: '#FFE097'
			});
		}

	});

});