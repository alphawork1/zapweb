yum.define([

], function () {

    Class('Financeiro.Item.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Financeiro');
        },

        validations: function () {
            return {
                'CentroCusto': new Mvc.Model.Validator.Required('Centro de custo é obrigatório'),
                'Descricao': new Mvc.Model.Validator.Required('Descrição  é obrigatória'),
                'Qtde': new Mvc.Model.Validator.Required('Quantidade é obrigatória'),
                'Unidade': new Mvc.Model.Validator.Required('Unidade é obrigatória'),
                'Valor': new Mvc.Model.Validator.Required('Valor é obrigatório')
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.Item.Model(json);

            return model;
        },

        actions: {

        }

    });

});