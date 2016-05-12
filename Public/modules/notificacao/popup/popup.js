yum.define([
	PI.Url.create('Notificacao', '/popup/popup.html'),
	PI.Url.create('Notificacao', '/popup/popup.css'),
    PI.Url.create('UI.Popup', '/popup.js'),
    PI.Url.create('Lib.Scroll', '/scroll.js')
], function (html) {

    Class('Notificacao.Popup').Extend(UI.Popup).Body({

        instances: function () {
            this.view.inject({
                title: '',
                content: html
            });

            this.position = 'top::right';
            this.type = 'fixed';
            
            this.items = [];
        },

        viewDidLoad: function () {
            this.view.header.hide();

            this.view.list.slimScroll();

            this.base.viewDidLoad();
        },

        clear: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].destroy();
            }

            this.items = [];
        },

        addItem: function (item) {
            var self = this;

            item.popup = this;

            item.render(this.view.list);

            this.items.push(item);
        },

        events: {

            '@todas click': function () {                
                var self = this;

                setTimeout(function () {
                    self.hide();
                    PI.Url.Hash.to('Notificacao');
                }, 1);
                
            }

        }

    });

});