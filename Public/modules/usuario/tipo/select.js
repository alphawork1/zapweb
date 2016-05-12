yum.define([
	
], function (html) {

    Class('Usuario.Tipo.Select').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div> <div at="tipo"></div> </div>');

            this.tipo = new UI.SelectionBox({ label: 'Tipo do Usuário' });
        },

        viewDidLoad: function () {
            this.tipo.add(new UI.Selection.Item({ id: 1, label: 'Administrador', showMenu: false }))
            this.tipo.add(new UI.Selection.Item({ id: 2, label: 'Comum', showMenu: false }))

            this.base.viewDidLoad();
        }

    });

});