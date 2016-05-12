yum.define([
	PI.Url.create('Util', '/search/textbox.js'),
    PI.Url.create('Cidade', '/model.js')
], function (html) {

    Class('Cidade.Search.TextBox').Extend(Util.Search.TextBox).Body({

        instances: function () {
            this.placeholder = 'Pesquisa por cidade';
            this.serviceUrl = '/cidade/search';
            this.paramName = 'nome';
        },

        init: function(){
            this.clearOnSelect = false;
            this.base.init();
        },

        getModel: function(json){
            return new Cidade.Model(json);
        },

        getValue: function(model){
            return model.getNomeWithEstado();
        }

    });

});