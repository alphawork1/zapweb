yum.define([
    
], function () {

    Class('Condominio.Prospectar.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Prospectar');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Condominio.Prospectar.Model(json);

            return model;
        },

        actions: {
            'enviar': '/enviar'
        }

    });
});