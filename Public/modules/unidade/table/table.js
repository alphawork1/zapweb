yum.define([
	PI.Url.create('Unidade', '/table/table.html'),
	PI.Url.create('Unidade', '/table/table.css'),
    PI.Url.create('Unidade', '/table/row.js')
], function (html) {

    Class('Unidade.Table').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.evidence = new UI.Evidence();

            this.rows = [];

            this.messageEmpty = 'Não foram vinculados unidades ainda';
            
            this.columns = ['excluir', 'editar'];
        },

        add: function (unidade) {
            if (this.hasUnidade(unidade)) return;

            var self = this;
            var row = new Unidade.TableRow({
                unidade: unidade,
                columns: this.columns,
                isOdd: this.rows.length % 2 == 0 ? false : true
            });

            if (this.rows.length == 0) {
                this.view.empty.hide();
            }

            row.render(this.view.tbody);

            row.event.listen('destroy', function () {
                self.removeRow(row);
            });

            this.evidence.anime();

            this.rows.push(row);
        },

        removeRow: function (row) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].unidade.Id == row.unidade.Id) {
                    this.rows.splice(i, 1);
                    break;
                }
            }

            if (this.rows.length == 0) {
                this.view.empty.show();
            }
        },

        hasUnidade: function (unidade) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].unidade.Id == unidade.Id) return true;
            }

            return false;
        },

        get: function () {
            var arr = [];

            for (var i = 0; i < this.rows.length; i++) {
                arr.push(this.rows[i].unidade);
            }

            return arr;
        },

        set: function (unidades) {
            if (unidades == null) return;

            for (var i = 0; i < unidades.length; i++) {
                this.add(unidades[i]);
            }
        }

    });

});