yum.define([
	PI.Url.create('UI.StatusStrip', '/item.js')
], function(html){
	
	Class('UI.StatusStrip.Separator').Extend(UI.StatusStrip.Item).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div class="status-strip-separador @{classPosition} status-strip-item">|</div>');

			this.clicked = false;
		}
	
	});
	
});