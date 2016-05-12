yum.define([
    
], function () {

    Class('Variavel.Tipo').Static({
        MOEDA: 0,
        DATA: 1,
        HORA: 2,
        TEXTO: 3,
        FORMULA: 4
    });

    Class('Variavel.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Variavel');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Variavel.Model(json);
            
            return model;
        },

        actions: {
            
        }

    });
});