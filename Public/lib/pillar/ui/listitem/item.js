yum.define([
    PI.Url.create('UI.ListItem', '/item.html'),
    PI.Url.create('UI.ListItem', '/item.css')
], function (html) {

    Class('UI.ListItem').Extend(Mvc.Component).Body({
        
        instances: function () {
            this.view = new Mvc.View(html);
        },

        select: function (b) {
            if (b) {
                this.view.element.addClass('selected');
            } else {
                this.view.element.removeClass('selected');
            }

            this.event.trigger('select');
        },

        isSelect: function () {
            return this.view.element.hasClass('selected');
        },

        setLabel: function (label) {
            this.view.label.html(label);
        },

        events: {

            '{element} click': function () {
                this.event.trigger('click', this);
            },

            '{element} mouseenter': function () {
                this.event.trigger('mouseenter', this);
            },

            '{element} mouseleave': function () {
                this.event.trigger('mouseleave', this);
            }

        }

    });

});