yum.define([
    
], function () {

    Class('Financeiro.Despesa.Search.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/Despesa');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.Despesa.Search.Model(json);

	        model.Data = Lib.DataTime.create(model.Data, 'yyyy-MM-dd hh:mm').getDateStringFromFormat('dd/MM/yyyy');

            return model;
        },

        actions: {
	        'pesquisar': '/pesquisar'
        }

    });

});