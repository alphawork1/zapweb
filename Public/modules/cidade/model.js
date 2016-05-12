yum.define([
    
], function () {

    Class('Cidade.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            this.account = new Auth.Model();
        },

        init: function () {
            this.base.init('/cidade');
        },

        getNomeWithEstado: function () {
            if (this.Nome == null) return '';

            return this.Nome + ', ' + this.Estado;
        },

        actions: {
            
        }

    });

});