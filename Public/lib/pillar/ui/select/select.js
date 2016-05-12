yum.define([
	PI.Url.create('UI', '/select/select.css')
], function(html){
	
	/**
	 * Classe reponsavel por renderizar a manipular component ComboBox
	 * 
	 * @class UI.Select
	 * @autor Manoel Neco
	 * @version: 1.0 
	 */
	Class('UI.Select').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div> <select class="ui-select" at="__select"></select> </div>');
		},

		viewDidLoad: function(){			
		    this.base.viewDidLoad();
			
			this.popule( this.items || [] );
			
			if(this.defaultValue != undefined) this.set( this.defaultValue );			
		},
		
		popule: function(arr){
			var view = '';
			
			for(var i in arr){
				if(PI.Type.isObject(arr[i])){					
					view += '<option value="' + arr[i].value + '">' + arr[i].text + '</option>';
				}else{
					view += '<option value="' + arr[i] + '">' + arr[i] + '</option>';					
				}
			}
			
			this.view.__select.html( view );
		},
		
		set: function(v){
			this.view.__select.val( v );
		},
		
		get: function(){
			return this.view.__select.val();
		},

		events: {
			
		}
	
	});
	
});