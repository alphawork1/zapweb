yum.define([
    PI.Url.create('Util', '/search/textbox.js'),
    PI.Url.create('Fornecedor', '/model.js')
], function (html) {

    Class('Fornecedor.Search.TextBox').Extend(Util.Search.TextBox).Body({

        instances: function () {
            this.placeholder = 'Pesquisa por fornecedor';
            this.serviceUrl = '/fornecedor/search';
            this.paramName = 'nome';
        },

        getModel: function(json){
            return Fornecedor.Model.create().initWithJson(json);
        },

        getValue: function(json){
            return json.Fantasia;
        }

    });

});