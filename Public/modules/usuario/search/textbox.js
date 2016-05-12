yum.define([
	PI.Url.create('Util', '/search/textbox.js')
], function (html) {

    Class('Usuario.Search.TextBox').Extend(Util.Search.TextBox).Body({

        instances: function () {
            this.placeholder = 'Pesquisa por usuário';
            this.serviceUrl = '/usuario/search';
            this.paramName = 'nome';
        },

        getModel: function(json){
            return Usuario.Model.create().initWithJson(json);
        },

        getValue: function(json){
            return json.Nome;
        }

    });

});