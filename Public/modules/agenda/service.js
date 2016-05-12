yum.define([
	PI.Url.create('Agenda', '/page/page.js')
], function (html) {

	Class('Service.Agenda').Extend(PI.Service).Body({

		load: function(app){
			this.base.load(app);
		},

		routes: {
			
			'Agenda/Mes': function(){
				setTimeout(function() {
					var page = new Agenda.Page({
						viewMode: 'month'
					});
					
					app.home.setPage( page );
				}, 1);
			},
			
			'Agenda/Semana': function(){
				setTimeout(function() {
					var page = new Agenda.Page({
						viewMode: 'agendaWeek'
					});
					
					app.home.setPage( page );
				}, 1);
			},
			
			'Agenda/Dia': function(){
				setTimeout(function() {
					var page = new Agenda.Page({
						viewMode: 'agendaDay'
					});
					
					app.home.setPage( page );
				}, 1);
			}
			
		},

		events: {
			
		}

	});

});