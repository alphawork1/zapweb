yum.define([
	PI.Url.create('Sindico', '/page/page.js'),
	PI.Url.create('Sindico', '/model.js')
], function (html) {

	Class('Service.Sindico').Extend(PI.Service).Body({

		load: function(app){
			this.base.load(app);
		},

		routes: {
			
			'Sindico/Adicionar': function(){
				setTimeout(function() {
					var page = new Sindico.Page({
						model: new Sindico.Model()
					}); 
					
					app.home.setPage( page );
				}, 1);
			}
			
		},

		events: {
			
		}

	});

});