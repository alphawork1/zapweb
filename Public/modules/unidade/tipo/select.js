yum.define([
	PI.Url.create('Unidade', '/tipo.unidade.js')
], function (html) {

    Class('Unidade.Tipo.Select').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div> <div at="tipo"></div> </div>');

            this.tipo = new UI.SelectionBox({ label: 'Tipo da Unidade' });
        },

        viewDidLoad: function () {
            this.tipo.add(new UI.Selection.Item({ id: 3, tipo: Unidade.Tipo.ZAP, label: 'ZAP', showMenu: false }));
            this.tipo.add(new UI.Selection.Item({ id: 1, tipo: Unidade.Tipo.COS, label: 'COS', showMenu: false }));
            this.tipo.add(new UI.Selection.Item({ id: 2, tipo: Unidade.Tipo.CENTRAL, label: 'CENTRAL', showMenu: false }));

            this.base.viewDidLoad();
        },

        get: function () {
            var item = this.tipo.get();

            if (item == null) return null;

            return item.tipo;
        },

        set: function (tipo) {
            this.tipo.set(function (item) {
                return item.tipo == tipo;
            });
        },

        setValidate: function (b) {
            this.tipo.setValidate(b);
        }

    });

});