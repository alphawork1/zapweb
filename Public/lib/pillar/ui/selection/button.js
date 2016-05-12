yum.define([
	PI.Url.create('UI.Selection', '/button.html'),
	PI.Url.create('UI.Selection', '/button.css'),
    PI.Url.create('UI.Selection', '/base.js')
], function (html) {

    Class('UI.Selection.Button').Extend(UI.Selection.Base).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.isSelectable = false;
        },

        events: {

            '{element} click': function (e) {
                this.event.trigger('click', this);
            }

        }

    });

});