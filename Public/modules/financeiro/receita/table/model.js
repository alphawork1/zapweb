yum.define([

], function () {

    Class('Financeiro.Receita.Item.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/');
        },

        validations: function () {
            return {
                'Dia': new Mvc.Model.Validator.Required('Dia é obrigatório'),
                'Cliente': new Mvc.Model.Validator.Required('Cliente é obrigatório'),
                'Valor': new Mvc.Model.Validator.Required('Valor é obrigatório'),
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.Receita.Item.Model(json);

            return model;
        },

        actions: {

        }

    });

});