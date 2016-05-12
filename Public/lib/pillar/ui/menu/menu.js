yum.define([
    PI.Url.create('UI.Menu', '/menu.html'),
    PI.Url.create('UI.Menu', '/menu.css')
], function (html) {

    Class('UI.Menu.Menu').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.items = [];
        },

        add: function (item) {
            var self = this;

            this.items.push(item);

            item.render(this.view.items);
            item.event.listen('click', function () {

                self.event.trigger('click', item);

                self.close();
                self.event.trigger('close');
            });
        },

        open: function () {
            this.view.element.addClass('ui-menu-opened');
        },

        close: function () {
            this.view.element.removeClass('ui-menu-opened');
        },

        events: {

            '@label click': function () {
                this.event.trigger('click');

                this.view.element.toggleClass('ui-menu-opened');
            },

            '@label mouseenter': function () {
                this.event.trigger('mouse::enter');
            }

        }

    });

});