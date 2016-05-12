yum.define([
	PI.Url.create('Financeiro', '/centrocusto/modal/modal.html'),
	PI.Url.create('Financeiro', '/centrocusto/modal/modal.css')
], function (html) {

    Class('Financeiro.CentroCusto.Modal').Extend(UI.Modal).Body({

        instances: function () {
            this.view.inject({
                title: 'Adicionar',
                body: html
            });

            this.nome = new UI.Tag({
                backEditing: false,
                placeholder: 'Nome',
                dataModel: 'Nome',
                tagToModel: function (tags) {
                    return tags.join(':');
                },
                modelToTag: function (model) {
                    return model.split(':');
                }

            });

            this.salvar = new UI.Button({
                label: 'Salvar',
                classes: 'verde'
            });

            this.cancelar = new UI.Button({
                label: 'Cancelar',
                classes: 'cinza'
            });
        },

        viewDidLoad: function(){
			
            if (this.model.isNotNew()) {
                this.injectModelToView(this.model);
            }

            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this;

                this.saveModel(this.model).ok(function () {
                    self.destroy();
                });
            },

            '{nome} enter': function () {
                var self = this;

                this.saveModel(this.model).ok(function () {
                    self.destroy();
                });
            },

            '{cancelar} click': function () {
                this.destroy();
            }

        }

    });

});