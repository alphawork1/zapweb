yum.define([
	PI.Url.create('Contato', '/painel.html'),
	PI.Url.create('Contato', '/painel.css'),
    PI.Url.create('Contato', '/model.js'),
    PI.Url.create('Telefone', '/painel.js'),
    PI.Url.create('Cidade', '/search/textbox.js')
], function (html) {

    Class('Contato.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.contato = new UI.TextBox({
                placeholder: 'Nome do contato',
                dataModel: 'Nome'
            });

            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.telefone = new Telefone.Painel({
                dataModel: 'Telefones'
            });

            this.model = new Contato.Model();
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