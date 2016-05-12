yum.define([

], function () {

    Class('Notificacao.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Notificacao');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Notificacao.Model(json);

            model.Data = Lib.DataTime.create(model.Data, 'yyyy-MM-dd hh:mm');

            return model;
        },

        actions: {
            'lida': '/lida?Id=:Id',
            'clear': '/clear',
            'total': '/total',
            'todasLida': '/todasLida'            
        }

    });

});