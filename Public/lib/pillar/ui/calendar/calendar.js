yum.define([		
	PI.Url.create('UI.Calendar', '/jq.calendar.js'),
	PI.Url.create('UI.Calendar', '/pt-br.js'),
	PI.Url.create('UI.Calendar', '/calendar.css'),
	// PI.Url.create('UI.Calendar', '/calendar.print.css')
], function(html){

	Class('UI.Calendar').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View('<div> <div at="__calendario"></div> </div>');
			
			this.viewMode = 'month';		
		},
				
		viewDidLoad: function(){
			this.base.viewDidLoad();	
						
			var self = this;
			
			this.view.__calendario.fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultView: this.viewMode,
				defaultDate: Lib.DataTime.Now().getDateStringFromFormat('yyyy-MM-dd'),
				editable: true,
				// businessHours: true,
				// eventLimit: true,
				// allDaySlot: false,
				events: function(start, end, time, cb){					
					self.event.trigger('refresh', start, end, cb);
				},
				eventDragStart: function(event){
					event.allDay = false;
				},
				eventDrop: function(obj, dayDelta, minuteDelta, allDay, revertFunc){
					console.log(arguments);
					// revertFunc();
					self.event.trigger('update::datetime', obj);
				},
				eventRender: function(obj, element){
					var label = new UI.Label();
					
					element.find('.fc-title').html('');
					
					label.render( element.find('.fc-title') );
					
					label.set(obj.description);
					
					// element.find('.fc-time').html('');					
					element.find('.fc-content').css('white-space', 'normal');
					element.css('white-space', 'normal');
				}
			});
		},
		
		refresh: function(){
			this.view.__calendario.fullCalendar( 'refetchEvents' );
		}

	});

});