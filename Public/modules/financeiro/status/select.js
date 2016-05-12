yum.define([

], function(html){

	Class('Financeiro.Status.Select').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View('<div> <div at="select"></div> </div>');

			this.select = new UI.SelectionBox({

			});
		},

		viewDidLoad: function(){

			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.TODOS, label: 'Status', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.ABERTA, label: 'Aberta', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.REMETIDA, label: 'Remetida', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.PAGA, label: 'Paga', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.NAO_PAGA, label: 'Não Paga', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.AUTORIZADA, label: 'Autorizada', showMenu: false }));
			this.select.add(new UI.Selection.Item({ id: Financeiro.Despesa.Status.NAO_APROVADA, label: 'Não Autorizada', showMenu: false }));

			this.select.setFirst();

		    this.base.viewDidLoad();
		},

		get: function(){
			return this.select.get().id;
		 }

	});

});