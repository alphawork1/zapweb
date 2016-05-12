yum.define([
    PI.Url.create('Lib', '/datatime/datatime.js')
], function () {

    Class('Historico.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Historico');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Historico.Model(json);

            model.Data = Lib.DataTime.create(model.Data, 'yyyy-MM-dd hh:mm').getDateStringFromFormat('dd/MM/yyyy às hh:mm');

            return model;
        },

        actions: {

        }

    });

});