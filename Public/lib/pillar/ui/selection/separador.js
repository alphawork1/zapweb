yum.define([
    PI.Url.create('UI.Selection', '/base.js'),
	PI.Url.create('UI.Selection', '/separador.css')
], function () {

    Class('UI.Selection.Separador').Extend(UI.Selection.Base).Body({

        instances: function () {
            this.view = new Mvc.View('<div class="ui-selection-separator"></div>');

            this.isSelectable = false;
        }

    });

});