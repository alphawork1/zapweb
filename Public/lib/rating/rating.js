yum.define([
	PI.Url.create('Lib', '/rating/raty.js'),
	PI.Url.create('Lib', '/rating/raty.css')
], function(html){

	Class('UI.Rating').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View('<div></div>');
			
			this.readOnly = false;
			this.cancel = false;
		},
		
		viewDidLoad: function(){
			$.fn.raty.defaults.path = PI.Url.create('Lib', '/rating/images').getUrl();			
		
			this.set(0);
			
			this.base.viewDidLoad();
		},
		
		get: function(){
			return this.view.element.raty('score');
		},
		
		set: function(rank){
			var self = this;
			
			this.view.element.raty('destroy');
			
			this.view.element.raty({
				score: rank,
				readOnly: this.readOnly,
				click: function(rating){					
					self.event.trigger('click', rating);
				}
			});
		},
		
		reload: function(){
			this.view.element.raty('reload');
		}

	});

});