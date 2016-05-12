yum.define([
	PI.Url.create('UI.StatusStrip', '/item.js')
], function(html){
	
	Class('UI.StatusStrip.Label').Extend(UI.StatusStrip.Item).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div class="status-strip-label @{classPosition} status-strip-item"> <i at="iconleft" class="icon-left @{iconLeft}"></i> <span at="value">@{label}</span> <i at="iconright" class="icon-left @{iconRight}"></i></div>');

			this.iconLeft = null;
			this.iconRight = null;
		},

		viewDidLoad: function(){
		    
		    if (this.iconLeft == null){
		    	this.view.iconleft.hide();
		    }

		    if (this.iconRight == null) {
		    	this.view.iconright.hide();
		    };

		    this.base.viewDidLoad();
		},
	
	});
	
});