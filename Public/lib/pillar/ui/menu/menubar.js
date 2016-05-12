yum.define([
	PI.Url.create('UI.Menu', '/menubar.html'),
	PI.Url.create('UI.Menu', '/menubar.css'),
    PI.Url.create('UI.Menu', '/menu.js'),
    PI.Url.create('UI.Menu', '/item.js'),
    PI.Url.create('UI.Menu', '/separador.js')
], function (html) {

    Class('UI.Menu.MenuBar').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.menus = [];
            this.opened = false;
        },

        add: function (menu, extra) {
            var self = this;

            this.menus.push(menu);

            if (extra == true) {
                menu.render(this.view.extras);
            } else {
                menu.render(this.view.menus);
            }

            menu.event.listen('click', function () {
                self.opened = true;
                self.closeAllMenus();
            });

            menu.event.listen('mouse::enter', function () {
                if (self.opened) {
                    self.closeAllMenus();
                    menu.open();
                }
            });

            menu.event.listen('close', function () {
                self.opened = false;
            });
        },

        addExtra: function (menu) {
            this.add(menu, true);
        },

        closeAllMenus: function () {
            for (var i in this.menus) {
                this.menus[i].close();
            }
        },

        events: {

            '{window} click': function (ee, e) {
                if ($(e.target).parents('.ui-menubar').length == 0) {
                    this.opened = false;
                    this.closeAllMenus();
                }
            }

        }

    });

});