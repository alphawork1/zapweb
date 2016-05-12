yum.define([
	PI.Url.create('Usuario', '/table/table.html'),
	PI.Url.create('Usuario', '/table/table.css'),
    PI.Url.create('Usuario', '/table/row.js')
], function (html) {

    Class('Usuario.Table').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.evidence = new UI.Evidence();

            this.rows = [];
            
            this.columns = ['excluir', 'editar'];
        },

        add: function (usuario) {
            if (this.hasUsuario(usuario)) return;

            var self = this;
            var row = new Usuario.TableRow({
                usuario: usuario,
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
                if (this.rows[i].usuario.Id == row.usuario.Id) {
                    this.rows.splice(i, 1);
                    break;
                }
            }

            if (this.rows.length == 0) {
                this.view.empty.show();
            }
        },

        hasUsuario: function (usuario) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].usuario.Id == usuario.Id) return true;
            }

            return false;
        },

        get: function () {
            var arr = [];

            for (var i = 0; i < this.rows.length; i++) {
                arr.push(this.rows[i].usuario);
            }

            return arr;
        },

        set: function (usuarios) {
            if (usuarios == null) return;

            for (var i = 0; i < usuarios.length; i++) {
                this.add(usuarios[i]);
            }
        }

    });

});