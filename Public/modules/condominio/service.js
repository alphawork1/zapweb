yum.define([
	PI.Url.create('Condominio', '/page/page.js'),
	PI.Url.create('Condominio', '/prospectar/page.js'),
	PI.Url.create('Condominio', '/search/page.js'),
	PI.Url.create('Condominio', '/campanha/page/page.js'),
	PI.Url.create('Condominio', '/campanha/model.js'),
	PI.Url.create('Condominio', '/model.js')
], function (html) {

	Class('Service.Condominio').Extend(PI.Service).Body({

		load: function(app){
			this.base.load(app);
		},

		routes: {
			
            'Condominio/Prospectar': function(){
                var page = new Condominio.Prospectar.Page({
                    
                });
                
                app.home.setPage( page );
            },
            
			'Condominio/Adicionar': function(){
				setTimeout(function() {
					var page = new Condominio.Page({
						model: new Condominio.Model()
					});
					
					app.home.setPage( page );
				}, 1);
			},			
			
			'Condominio/Editar/:Id': function(Id){
				setTimeout(function() {
					var page = new Condominio.Page({
						model: new Condominio.Model({
							Id: Id
						})
					});
					
					app.home.setPage( page );
				}, 1);
			},			
			
			'Condominio/Editar/:Id/Historico': function(Id){
				setTimeout(function() {
					var page = new Condominio.Page({
						model: new Condominio.Model({
							Id: Id							
						})
					});
										
					page.contatos.evidence( PI.Url.Hash.getQuery('id') );
					
					app.home.setPage( page );					
					
					page.tabbar.select('contatos');
				}, 1);
			},			
			
			'Condominio/Pesquisar': function(){
				setTimeout(function() {
					var page = new Condominio.Search.Page();
					
					app.home.setPage( page );
				}, 1);
			},
			
			'Condominio/Gerar/Campanha/:Id': function(condominioId){
				setTimeout(function() {
					var page = new Condominio.Campanha.Page({
						model: new Condominio.Campanha.Model({
							Condominio: new Condominio.Model({
								Id: condominioId
							})
						})
					});
					
					app.home.setPage( page );
				}, 1);
			},
			
			'Condominio/Editar/Campanha/:Id': function(campanhaId){
				setTimeout(function() {
					var page = new Condominio.Campanha.Page({
						model: new Condominio.Campanha.Model({
							Id: campanhaId
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