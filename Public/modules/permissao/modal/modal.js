yum.define([
	PI.Url.create('Permissao', '/modal/modal.html'),
	PI.Url.create('Permissao', '/modal/modal.css'),
    PI.Url.create('Permissao', '/table/table.js'),
    PI.Url.create('Permissao', '/grupo.model.js')
], function (html) {

    Class('Permissao.Modal').Extend(UI.Modal).Body({

        instances: function () {
            this.view.inject({
                title: 'Adicionar Grupo de Permissão',
                body: html
            });

            this.nome = new UI.TextBox({
                placeholder: 'Nome do grupo',
                dataModel: 'Nome'
            });

            this.salvar = new UI.Button({
                label: 'Salvar',
                classes: 'verde'
            });

            this.cancelar = new UI.Button({
                label: 'Cancelar',
                classes: 'cinza'
            });

            this.model = new GrupoPermissao.Model();
        },

        viewDidLoad: function () {

            if (this.model.isNotNew()) {
                this.injectModelToView(this.model);
            }

            this.base.viewDidLoad();
        },

        show: function () {
            this.base.show();

            this.nome.focus();
        },

        events: {

            '{salvar} click': function () {
                var self = this;

                this.saveModel().ok(function () {
                    self.destroy();
                });
            },

            '{cancelar} click': function () {
                this.destroy();
            },

        }

    });

});