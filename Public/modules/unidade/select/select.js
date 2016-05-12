yum.define([
	// PI.Url.create('Unidade', '/select/select.html'),
	// PI.Url.create('Unidade', '/select/select.css')
], function(html){
	
	Class('Unidade.Select').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div> <div at="select"></div> </div>');

			this.select = new UI.SelectionBox({
				label: 'Selecione a Unidade'
			});

            this.model = new Unidade.Model();
		},

		viewDidLoad: function(){		    
		    this.loadAndFill();

		    this.base.viewDidLoad();
		},

		loadAndFill: function(){
			var self = this;

		    this.model.all().ok(function(filhas){

		    	for(var i in filhas){
		    	    var filha = filhas[i];

		    		self.select.add(new UI.Selection.Item({ id: filha.Id, label: filha.Nome, model: filha, showMenu: false }));
		    	}
		    });

		}
	
	});
	
});