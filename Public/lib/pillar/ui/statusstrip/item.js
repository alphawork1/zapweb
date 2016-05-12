yum.define([
	
], function(html){
	
	Class('UI.StatusStrip.Item').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.orientation = {
				'right': 'status-strip-right',
				'left': 'status-strip-left'
			};

			this.position = 'left';
			this.clicked = true;
		},

		init: function(){

			this.classPosition = this.orientation[ this.position ];

		    this.base.init();		    
		},

		set: function(value){
		    this.view.value.html(value);
		},

		get: function(){
		    return this.view.value.html();
		},

		events: {
			
			'{element} click': function(){
				if (!this.clicked) return;
				
				this.event.trigger('click', this);
			}
		
		}
	
	});
	
});