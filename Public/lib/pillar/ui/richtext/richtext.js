yum.define([	
	
], function(html){
	
	/**
	 * @class Ui.RichText
	 */
	Class('UI.RichText').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div><textarea at="editor" id="@{id}"></textarea ></div>');

			this.id = PI.Util.UUID();
		},

		viewDidLoad: function(){
			var self = this;
		    
			this.view.editor.ckeditor();
		    this.base.viewDidLoad();
		},

		/**
		 * Seta o conteudo o rich text
		 * 
		 * @method set
		 * @param {string} text
		 * @return {this}
		 */
		set: function(text){
			var self = this;

			setTimeout(function(){				
		    	CKEDITOR.instances[ self.id ].setData( text );
			}, 1000);

		    return this;
		},

		/**
		 * Retorna o conteudo em HTML do rich text
		 * 
		 * @method get
		 * @return {string}
		 */
		get: function(){
		   	return CKEDITOR.instances[ this.id ].getData();
		}
	
	});
	
});