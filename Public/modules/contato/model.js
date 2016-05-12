yum.define([

], function () {

    Class('Contato.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Contato');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Contato.Model(json);

            return model;
        },

        actions: {

        }

    });

});