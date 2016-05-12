yum.define([
	PI.Url.create('UI.ContextMenu', '/item.html'),
	//PI.Url.create('UI.ContextMenu', '/item.css')
], function (html) {

    Class('UI.ContextMenuItem').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        events: {

            '{element} click': function (e, ee) {
                this.event.trigger('click', this, e, ee);
            }

        }
    });

});