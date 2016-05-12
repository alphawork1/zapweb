yum.define([
    PI.Url.create('Financeiro', '/receita/search/row.html')
], function(html){

	Class('Financeiro.Receita.Search.TableRow').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);

			this.editar = new UI.Button({
				label: 'Editar',
				classes: 'cinza'
			});
		},

		viewDidLoad: function(){
		    
			if (this.number % 2 != 0) {
				this.view.element.addClass('');
			}

		    this.base.viewDidLoad();
		},

		events: {
			
			'{editar} click': function(){
				PI.Url.Hash.to('Receita/Editar/' + this.receita.Id);
			}
		
		}

	});

});