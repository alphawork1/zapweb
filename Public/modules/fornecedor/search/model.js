yum.define([
    
], function () {

    Class('Fornecedor.Search.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/Fornecedor');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Fornecedor.Search.Model(json);

            return model;
        },

        actions: {

        }

    });

});