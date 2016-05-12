yum.define([
    
], function () {

    Class('RealTime.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/realtime');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new RealTime.Model(json);

            return model;
        },

        actions: {
        	'set': '/set?connectionId=:connectionId'
        }

    });

});