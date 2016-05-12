yum.define([
	PI.Url.create('Endereco', '/painel.html'),
	PI.Url.create('Endereco', '/painel.css'),
    PI.Url.create('Endereco', '/model.js')
], function (html) {

    Class('Endereco.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.cep = new UI.TextBox({
                placeholder: 'Cep',
                dataModel: 'Cep'
            });

            this.numero = new UI.TextBox({
                placeholder: 'Número',
                dataModel: 'Numero'
            });

            this.rua = new UI.TextBox({
                placeholder: 'Rua',
                dataModel: 'Rua'
            });

            this.bairro = new UI.TextBox({
                placeholder: 'Bairro',
                dataModel: 'Bairro'
            });

            this.cidade = new Cidade.Search.TextBox({
                dataModel: 'Cidade'
            });

            this.model = new Endereco.Model();
        },

        get: function () {
            this.injectViewToModel(this.model);

            return this.model;
        },

        set: function (model) {
            if (model == null) return;

            this.model = model;

            this.injectModelToView(this.model);
        }

    });

});