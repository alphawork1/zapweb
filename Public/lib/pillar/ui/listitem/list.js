yum.define([
    PI.Url.create('UI.ListItem', '/list.html'),
    PI.Url.create('UI.ListItem', '/list.css'),
    PI.Url.create('UI.ListItem', '/item.js')
], function (html) {

    Class('UI.List').Extend(Mvc.Component).Body({

        instances: function () {
            this.seek = new PI.Seek();
            this.view = new Mvc.View(html);
            this.items = [];
            this.viewParent = null;
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();

            this.hide();
        },

        setViewParent: function (v) {
            this.viewParent = v;
        },

        add: function (item) {
            var self = this;

            this.items.push(item);
            item.render(this.view.list);

            item.event.listen('click', function () {
                self.event.trigger('item::click', item);
            });

            item.event.listen('mouseenter', function () {
                self.event.trigger('mouseenter', item);
            });

            item.event.listen('mouseleave', function () {
                self.event.trigger('mouseleave', item);
            });

            this.seek.setMax(this.items.length - 1);

            return this;
        },

        clear: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].destroy();
            }

            this.items = [];

            this.seek.clear();

            return this;
        },

        empty: function () {
            var empty = new UI.ListItem({texto: 'Nenhum item encontrado'});

            this.clear();
            this.add(empty);

            return this;
        },

        loading: function () {
            var empty = new UI.ListItem({ texto: 'Carregando ...', iconLeft: 'anime-spinner' });

            this.clear();
            this.add(empty);

            return this;
        },

        selectNextItem: function () {
            this.seek.next();
            this.selectItemByIndex(this.seek.index());
        },

        selectPreviewItem: function () {
            this.seek.prev();
            this.selectItemByIndex(this.seek.index());
        },

        selectItemByIndex: function (index) {

            for (var i = 0; i < this.items.length; i++) {
                this.items[i].select(false);
            }

            this.items[index].select(true);
        },

        getItemSelected: function () {
            var selected = null;

            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].isSelect()) {
                    selected = this.items[i];
                    break;
                }
            }

            return selected;
        },

        getItems: function () {
            return this.items;
        },

        events: {

            '{window} click': function (ee, e) {
                var view = this.viewParent || this.view;

                if ($(e.target).parents(view.getElementIdWithHash()).length == 0) {
                    if (this.isVisible()) {
                        this.hide();
                    }
                }                
            }

        }

    });

});