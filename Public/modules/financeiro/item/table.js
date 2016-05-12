yum.define([
	PI.Url.create('Financeiro', '/item/table.html'),
	PI.Url.create('Financeiro', '/item/table.css'),
    PI.Url.create('Financeiro', '/item/row.js')
], function (html) {

    Class('Financeiro.Item.Table').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.addNew = new UI.Button({
                label: 'Adicionar Item',
                iconLeft: 'fa fa-plus',
                classes: 'cinza',
            });

            this.total = new UI.Label({
                label: 'R$ 0,00',
                classes: 'financeiro-table-control',
                style: {
                    'float': 'right'
                }
            });

            this.rows = [];
        },

        viewDidLoad: function () {
            this.total.setEnable(false);
			
            this.addRow();

            this.base.viewDidLoad();
        },

        addRow: function () {
            var self = this;
            var item = new Financeiro.Item.TableRow();
            var index = this.rows.length;

            this.rows.push(item);

            item.render(this.view.tbody);

            item.event.listen('view::did::destroy', function () {
                self.rows.splice(index, 1);
	            self.calculeTotalGeral();
            });

            item.event.listen('total::change', function () {
                self.calculeTotalGeral();
            });

            return item;
        },

        calculeTotalGeral: function () {
            var total = 0;

            for (var i = 0; i < this.rows.length; i++) {
                total += this.rows[i].getTotal();
            }

            this.total.set('R$ ' + PI.Convert.DolarToReal(total));
        },

        clear: function () {
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].destroy();
            }

            this.rows = [];
        },

        get: function () {
            var items = this.rows,
                arr = [];

            for (var i = 0; i < items.length; i++) {
                arr.push(items[i].get());
            }

            return arr;
        },

        set: function (items) {
            this.clear();

            for (var i in items) {
                var item = items[i];

                this.addRow().set(item);
            }
        },

        events: {

            '{addNew} click': function () {
                this.addRow();
            }

        }

    });

});