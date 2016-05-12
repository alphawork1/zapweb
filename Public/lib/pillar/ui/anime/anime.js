yum.define([
	PI.Url.create('UI.Anime', '/anime.html'),
	PI.Url.create('UI.Anime', '/anime.css')
], function(html){

	/**
	 * Renderiza um loading estilo google chrome
	 * 
	 * @class UI.Anime
	 */
	Class('UI.Anime').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);

			this.showing = false;

			this.label = '';
		},

		viewDidLoad: function(){
		  			
			this.showing ? this.show() : this.hide();

		    this.base.viewDidLoad();
		},

		events: {
			
			'{element} click': function(){
				this.event.trigger('click', this);
			}
		
		}
	});
	
});