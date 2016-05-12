yum.define([
	//PI.Url.create('Financeiro', '/centrocusto/select.html'),
	//PI.Url.create('Financeiro', '/centrocusto/select.css'),
    PI.Url.create('Financeiro', '/centrocusto/model.js'),
    PI.Url.create('Financeiro', '/centrocusto/modal/modal.js')
], function (html) {

    Class('Financeiro.CentroCusto.Select').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div class="@{classes}"> <div at="select"></div> <div at="modal"></div> </div>');

            this.classes = '';

            this.select = new UI.SelectionBox({
                label: 'Centro de Custo',
                onSetLabel: function (label) {
                    var i = label.lastIndexOf(' ');
                    return label.substring(i);
                }
            });

            this.add = new UI.Selection.Button({ label: 'Adicionar', iconLeft: 'fa-plus text-success' });
        },

        viewDidLoad: function () {

            this.loadAndFill();
        },

        loadAndFill: function () {
            var self = this;

            Financeiro.CentroCusto.Model.create().all(this.tipo).ok(function (centros) {
                for (var i = 0; i < centros.length; i++) {
                    self.addItem(centros[i]);
                }

                self.select.add(new UI.Selection.Separador());
                self.select.add(self.add);

                self.base.viewDidLoad();
            });
        },

        addItem: function (centroCusto) {
            var self = this;
            var item = new UI.Selection.Item({ id: centroCusto.Id, label: centroCusto.getNome(), model: centroCusto, showMenu: true });
            item.add = new UI.MenuDownItem({ label: 'Incluir', iconLeft: 'fa fa-plus text-info' });

            this.select.add(item);

            item.menu.add(item.add);

            item.add.event.listen('click', function () {
                var modal = new Financeiro.CentroCusto.Modal({
                    model: new Financeiro.CentroCusto.Model({ Tipo: self.tipo })
                });

                modal.render(self.view.modal);

                modal.open();

                modal.injectModelToView(centroCusto);
                modal.setTitle('Adicionar');
                modal.nome.newTag();

                modal.event.listen('model::added', function (model) {
                    var item = self.addItem(model);
                    self.select.select(item);
                });
            });

            item.editar.event.listen('click', function () {
                var modal = new Financeiro.CentroCusto.Modal({
                    model: centroCusto
                });

                modal.render(self.view.modal);

                modal.setTitle('Editar');

                modal.open();

                modal.event.listen('model::updated', function (model) {
                    item.setLabel(model.getNome());
                });
            });

            item.excluir.event.listen('click', function(){
                
                Confirm.show('Atenção', 'Tem certeza que deseja excluir?', function(b){
                    
                    if (b) {
                        centroCusto.excluir().ok(function(){
                            item.destroy();
                        }).error(function(message){
                            Alert.show('Não foi possível', message);
                        });
                    };

                })

            });

            return item;
        },

        get: function () {
            var item = this.select.get();

            if (item == null) return item;

            return item.model;
        },

        set: function (centroCusto) {
            this.select.set(function (item) {
                return item.model.Id == centroCusto.Id
            });
        },

        setValidate: function (b) {
            this.select.setValidate(b);
        },

        events: {

            '{add} click': function () {
                var self = this;
                var modal = new Financeiro.CentroCusto.Modal({
                    model: new Financeiro.CentroCusto.Model({ Tipo: this.tipo })
                });

                modal.render(this.view.modal);

                modal.open();

                modal.event.listen('model::added', function (model) {
                    var item = self.addItem(model);
                    self.select.select(item);
                });
            }

        }

    });

});