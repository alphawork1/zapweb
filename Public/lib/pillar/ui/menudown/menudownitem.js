yum.define([
    PI.Url.create('UI.MenuDown', '/menudownitem.html'),
    PI.Url.create('UI.MenuDown', '/menudownitem.css')
], function (html) {

    Class('UI.MenuDownItem').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        setLabel: function (label) {
            this.view.label.html(label);
        },

        getLabel: function () {
            return this.view.label.html();
        },

        events: {

            '{element} click': function () {
                this.event.trigger('click', this);
            }

        }

    });

});