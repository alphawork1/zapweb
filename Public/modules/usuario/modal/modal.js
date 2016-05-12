yum.define([
	PI.Url.create('Usuario', '/modal/modal.html'),
	PI.Url.create('Usuario', '/modal/modal.css'),
    PI.Url.create('Usuario', '/tipo/select.js'),
    PI.Url.create('Usuario', '/model.js'),
    PI.Url.create('Permissao', '/select/select.js')
], function (html) {

    Class('Usuario.Modal').Extend(UI.Modal).Body({

        instances: function () {
            this.view.inject({
                title: 'Adicionar Usuário',
                body: html
            });

            this.nome = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Nome'
            });

            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.username = new UI.TextBox({
                dataModel: 'Username',
                placeholder: 'Login de acessso'
            });

            this.password = new UI.TextBox({
                type: 'password',
                dataModel: 'Password',
                placeholder: 'Senha'
            });

            this.permissao = new Permissao.Select({
                placeholder: 'Permissão',
                dataModel: 'Permissao'
            });

            this.salvar = new UI.Button({
                label: 'Salvar',
                classes: 'verde'
            });

            this.cancelar = new UI.Button({
                label: 'Cancelar',
                classes: 'cinza'
            });

            this.model = new Usuario.Model();
        },

        show: function () {
            this.base.show();

            this.nome.focus();
        },

        events: {

            '{salvar} click': function () {
                var self = this,
                    s = this.injectViewToModel(this.model.Account);

                if (!s.status) {
                    Alert.error('Não foi possível salvar', s.messages.join('<br/>'));
                    return;
                }

                this.saveModel().ok(function () {
                    self.destroy();
                });
            },

            '{cancelar} click': function () {
                this.destroy();
            },

        }

    });

});