yum.define([
	PI.Url.create('Financeiro', '/item/row.html'),
	PI.Url.create('Financeiro', '/item/row.css'),
    PI.Url.create('Financeiro', '/item/model.js')
], function (html) {

    Class('Financeiro.Item.TableRow').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.descricao = new UI.TextBox({
                placeholder: 'Descrição',
                classes: 'financeiro-table-control',
                dataModel: 'Descricao'
            });

            this.centroCusto = new Financeiro.CentroCusto.Select({
                tipo: Financeiro.CentroCusto.Tipo.SAIDA,
                classes: 'financeiro-table-control',
                dataModel: 'CentroCusto'
            });

            this.unid = new UI.TextBox({
                defaultValue: 'PC',
                dataModel: 'Unidade',
                classes: 'financeiro-table-control',
                style: {
                    'text-align': 'center'
                }
            });

            this.qtde = new UI.TextBox({
                defaultValue: '0',
                dataModel: 'Qtde',
                mask: 'numero',
                classes: 'financeiro-table-control',
                style: {
                    'text-align': 'center'
                }
            });

            this.valor = new UI.TextBox({
                placeholder: 'R$ 0,00',
                dataModel: function (model, method, value) {
                    if (method == 'set') {
                        model.Valor = PI.Convert.RealToDolar(value);
                    } else {
                        return PI.Convert.DolarToReal(model.Valor);
                    }
                },
                mask: 'financeira',
                classes: 'financeiro-table-control',
                style: {
                    'text-align': 'right'
                }
            });

            this.total = new UI.TextBox({
                placeholder: 'R$ 0,00',
                mask: 'financeira',
                classes: 'financeiro-table-control',
                style: {
                    'text-align': 'right'
                }
            });

            this.excluir = new UI.Button({
                label: '',
                iconLeft: 'fa fa-trash-o',
                classes: 'vermelho'
            });
        },

        viewDidLoad: function () {
            this.total.setEnable(false);

            this.base.viewDidLoad();
        },

        getTotal: function () {
            var total = 0;

            try {
                var qtde = parseFloat(this.qtde.get()),
                    valor = parseFloat(PI.Convert.RealToDolar(this.valor.get()));

                total = qtde * valor;

            } catch (e) {

            }

            return total;
        },

        calculeTotal: function () {
            var total = this.getTotal();
            this.total.set('R$ ' + PI.Convert.DolarToReal(total));                
            this.event.trigger('total::change');
        },

        get: function () {
            var model = new Financeiro.Item.Model();
            var s = this.injectViewToModel(model);

            if (!s.status) {
                throw s.messages;
            }

            return model;
        },

        set: function (item) {            
            this.injectModelToView(item);

            this.calculeTotal();
        },

        events: {

            '{qtde} change': function () {
                this.calculeTotal();
            },

            '{valor} keyup': function () {
                this.calculeTotal();
            },

            '{excluir} click': function () {
                this.destroy();
            }

        }
    });

});