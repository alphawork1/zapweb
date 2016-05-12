yum.define([
    PI.Url.create('UI.MenuDown', '/menudown.html'),
    PI.Url.create('UI.MenuDown', '/menudown.css'),
    PI.Url.create('UI.MenuDown', '/menudownitem.js')
], function (html) {

    Class('UI.MenuDown').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.seek = new PI.Seek(1, 1);

            this.container = null;
        },

        setContainer: function(container){
            this.container = container;

            this.view.element.css('position', 'static');
            this.container.css('position', 'relative');
        },

        calculePositionMenu: function () {
            var menu = this.view.menu,
                button = this.view.menuDownButton,
                scrollTop = this.container == null ? 0 : this.container.scrollTop(),
                hDiv = this.container == null ? 0 : this.container.height();

            var t = scrollTop + button.position().top - 2;
            var l = button.position().left - menu.width() + button.width();

            //show menu position bottom
            if (scrollTop + button.position().top + menu.height() > scrollTop + hDiv) {
                t = scrollTop + button.position().top - menu.height() - 20;
            }

            menu.css('top', t + 'px').css('left', l + 'px');
        },

        add: function (item) {
            var self = this;

            item.render(this.view.menu);

            item.event.listen('click', function () {
                self.hideMenu();
                self.event.trigger('select', item);
            });

            return this;
        },

        showMenu: function (visible, timeout) {
            this.calculePositionMenu();

            this.view.menu.show();
            this.visible = true;

            this.event.trigger('show');
        },

        hideMenu: function () {
            this.view.menu.hide();
            this.visible = false;

            this.event.trigger('hide');
        },

        events: {

            '{window} click': function (ee, e) {
                if (!this.visible) return;

                if ($(e.target).parents(this.view.getElementIdWithHash()).length == 0) {
                    this.hideMenu();
                }

            },

            '@menuDownButton click': function () {
                this.showMenu();                
            },

            '@menuDownButton keydown': function (t, e) {
                switch (e.keyCode) {
                    case PI.KEYBOARD.KEYUP:
                        this.seek.prev();
                        //this.highlight(this.seek.index());
                        this.visible_menu(true, 0);
                        break;
                    case PI.KEYBOARD.KEYDOWN:
                        this.seek.next();
                        //this.highlight(this.seek.index());
                        this.visible_menu(true, 0);
                        break;
                    case PI.KEYBOARD.ENTER:
                        $('[index=' + this.seek.index() + ']').click();
                        break;
                }
            }

        }

    });

});