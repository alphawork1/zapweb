yum.define([
    
], function () {

    Class('Permissao.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/permissao');
        },

        actions: {
            'tipos': '/tipos'
        }

    });

});