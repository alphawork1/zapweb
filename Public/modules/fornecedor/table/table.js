yum.define([
	PI.Url.create('Fornecedor', '/table/table.html'),
	PI.Url.create('Fornecedor', '/table/table.css'),
    PI.Url.create('Fornecedor', '/table/row.js')
], function (html) {

    Class('Fornecedor.Table').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.evidence = new UI.Evidence();

            this.rows = [];

            this.messageEmpty = '';
            
            this.columns = ['excluir', 'editar'];
        },

        clear: function(){
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].destroy();
            }

            this.rows = [];

            this.view.empty.show();
        },  

        add: function (fornecedor) {
            if (this.hasFornecedor(fornecedor)) return;

            var self = this;
            var row = new Fornecedor.TableRow({
                fornecedor: fornecedor,
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
                if (this.rows[i].fornecedor.Id == row.fornecedor.Id) {
                    this.rows.splice(i, 1);
                    break;
                }
            }

            if (this.rows.length == 0) {
                this.view.empty.show();
            }
        },

        hasFornecedor: function (fornecedor) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].fornecedor.Id == fornecedor.Id) return true;
            }

            return false;
        },

        get: function () {
            var arr = [];

            for (var i = 0; i < this.rows.length; i++) {
                arr.push(this.rows[i].fornecedor);
            }

            return arr;
        },

        set: function (fornecedores) {
            if (fornecedores == null) return;

            this.clear();

            for (var i = 0; i < fornecedores.length; i++) {
                this.add(fornecedores[i]);
            }
        }

    });

});