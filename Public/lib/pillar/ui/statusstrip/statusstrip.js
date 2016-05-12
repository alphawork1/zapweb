yum.define([
	PI.Url.create('UI.StatusStrip', '/statusstrip.html'),
	PI.Url.create('UI.StatusStrip', '/statusstrip.css'),
	PI.Url.create('UI.StatusStrip', '/label.js'),
	PI.Url.create('UI.StatusStrip', '/separator.js')
], function(html){
	
	Class('UI.StatusStripBar').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);
		},

		add: function(item){
		    item.render(this.view.container);

		    return this;
		},

		viewDidLoad: function(){
			var self = this;

			setTimeout(function(){
				self.view.element.css('width', '100%');	
			}, 1000);
		    
		    this.base.viewDidLoad();
		},
	
	});
	
});