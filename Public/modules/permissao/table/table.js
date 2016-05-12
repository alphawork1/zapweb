yum.define([
	PI.Url.create('Permissao', '/table/table.html'),
	PI.Url.create('Permissao', '/table/table.css'),
    PI.Url.create('Permissao', '/table/row.js'),
    PI.Url.create('Permissao', '/model.js')
], function (html) {

    Class('Permissao.Table').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.rows = [];
        },

        viewDidLoad: function () {
            this.view.tbody.html('<tr><td>Carregando...</td></tr>');

            this.loadAndFill();
        },

        loadAndFill: function () {
            var self = this;

            Permissao.Model.create().tipo().ok(function (permissoes) {
                self.view.tbody.html('');

                for (var i in permissoes) {
                    var permissao = permissoes[i];

                    self.addRow(new Permissao.TableRow({
                        permissao: permissao
                    }));
                }

                self.base.viewDidLoad();
            });
        },

        addRow: function (row) {
            this.rows.push(row);

            row.render(this.view.tbody);
        },

        get: function () {
            var rows = this.rows,
                selecionados = [];

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                
                if (row.checkbox.isChecked()) {
                    selecionados.push(row.permissao);
                }
            }

            return selecionados;
        }

    });

});