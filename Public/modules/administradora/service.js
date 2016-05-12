yum.define([
	PI.Url.create('Administradora', '/page/page.js'),
	PI.Url.create('Administradora', '/model.js')
], function (html) {

	Class('Service.Administradora').Extend(PI.Service).Body({

		load: function(app){
			this.base.load(app);
		},

		routes: {
			
			'Administradora/Adicionar': function(){
				setTimeout(function() {
					var page = new Administradora.Page({
						model: new Administradora.Model()
					}); 
					
					app.home.setPage( page );
				}, 1);
			},
			
			'Administradora/Editar/:Id': function(id){
				setTimeout(function() {
					var page = new Administradora.Page({
						model: new Administradora.Model({
							Id: id
						})
					}); 
					
					app.home.setPage( page );
				}, 1);
			}
			
		},

		events: {
			
		}

	});

});