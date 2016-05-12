yum.define([
	PI.Url.create('Telefone', '/painel.html'),
	PI.Url.create('Telefone', '/painel.css'),
    PI.Url.create('Telefone', '/item.js')
], function (html) {

    Class('Telefone.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.items = [];

            this.add = new UI.Button({
                label: 'Adicionar outro',
                classes: 'cinza',
                iconLeft: 'fa fa-phone'
            });
        },

        viewDidLoad: function () {
            this.addItem();
            this.base.viewDidLoad();
        },

        addItem: function () {
            var self = this;
            var item = new Telefone.Item();
            var index = this.items.length;

            this.items.push(item);

            item.render(this.view.container);
            
            item.event.listen('destroy', function(){
                self.items.splice(index, 1);
            });

            return item;
        },

        clear: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].destroy();
            }

            this.items = [];
        },

        get: function () {
            var arr = [];

            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i].get();
                if (item == null) continue;

                arr.push(item);
            }

            return arr;
        },

        set: function (telefones) {
            if (telefones == null) return;

            if (telefones.length > 0) {
                this.clear();
            }

            for (var i = 0; i < telefones.length; i++) {
                var t = telefones[i];
                var item = this.addItem();

                item.set(t);
            }

            this.addItem();
        },

        events: {

            '{add} click': function () {
                this.addItem();
            }

        }

    });

});