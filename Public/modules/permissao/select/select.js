yum.define([
	PI.Url.create('Permissao', '/modal/modal.js'),
    PI.Url.create('Permissao', '/grupo.model.js')
], function (html) {

    Class('Permissao.Select').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div> <div at="tipo"></div> <div at="modal"></div> </div>');

            this.tipo = new UI.SelectionBox({ label: 'Permissão' });

            this.add = new UI.Selection.Button({ label: 'Adicionar', iconLeft: 'fa-plus text-success' });

            this.showAdd = false;
        },

        viewDidLoad: function () {
            this.loadAndFill();
        },

        loadAndFill: function () {
            var self = this;

            GrupoPermissao.Model.create().all().ok(function (grupos) {
                for (var i in grupos) {
                    self.addItem(grupos[i]);
                }

                if (self.showAdd) {
                    self.tipo.add(new UI.Selection.Separador());
                    self.tipo.add(self.add);
                }
                
                self.base.viewDidLoad();
            });
        },

        addItem: function (grupo) {
            var self = this;
            var item = new UI.Selection.Item({ id: grupo.Id, label: grupo.Nome, model: grupo, showMenu: true });

            this.tipo.add(item);

            item.editar.event.listen('click', function () {
                self.editar(item);
            });

            item.excluir.event.listen('click', function () {
                item.model.remove().ok(function () {
                    item.destroy();
                }).error(function (message) {
                    Alert.error('Não foi possível excluir', message);
                }).done(function () {

                });
            });

            return item;
        },

        get: function () {
            var item = this.tipo.get();

            if (item == null) return false;

            return item.model;
        },

        set: function(permissao){
            if(permissao == null) return;

            this.tipo.set(function(item){
                return item.model.Id == permissao.Id;
            });

        },

        setValidate: function (b) {
            this.tipo.setValidate(b);
        },

        editar: function (item) {
            var self = this,
                modal = new Permissao.Modal({
                    model: item.model
                });

            modal.render(this.view.modal, true);

            modal.show();

            modal.event.listen('model::updated', function (model) {
                item.setLabel(model.Nome);
            });
        },

        events: {

            '{add} click': function () {
                var self = this,
                    modal = new Permissao.Modal();

                modal.render(this.view.modal, true);

                modal.show();

                modal.event.listen('model::added', function (model) {
                    var item = self.addItem(model);
                    self.tipo.select(item);
                });
            }
        }

    });

});