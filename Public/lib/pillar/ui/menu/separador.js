yum.define([
			PI.Url.create('UI.Menu', '/separador.html'),
			PI.Url.create('UI.Menu', '/separador.css')
], function (html) {

    Class('UI.Menu.Separador').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        }

    });

});