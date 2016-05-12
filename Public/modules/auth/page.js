yum.define([
	PI.Url.create('Auth', '/page.html'),
	PI.Url.create('Auth', '/page.css'),
    PI.Url.create('Auth', '/model.js')
], function (html) {

    Class('Auth.Page').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.usuario = new UI.TextBox({
                dataModel: 'UserName',
                placeholder: 'Nome do Usuário',
                style: {
                    width: '274px'
                }
            });

            this.senha = new UI.TextBox({
                type: 'password',
                dataModel: 'Password',
                placeholder: 'Senha',
                style: {
                    width: '274px'
                }
            });

            this.entrar = new UI.Button({
                label: 'Entrar',
                classes: 'azul'
            });
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();

            PI.Cookie.remove('unidade');

            this.usuario.focus();
        },

        tryLogar: function () {
            var auth = new Auth.Model(),
                label = this.entrar.getLabel(),
                self = this,
                v = this.injectViewToModel(auth);

            this.view.info.hide();

            if (!v.status) {
                this.setMessage(v.messages.join('<br/>'));
                return;
            }

            this.entrar.setLabel('Entrando ...').lock();

            auth.entrar().ok(function () {
                window.location = "/";
            }).error(function () {
                self.entrar.setLabel(label).unlock();
                self.setMessage('Usuário ou Senha Incorreta');
            });
        },

        setMessage: function (message) {
            if (PI.Type.isArray(message)) message = message.join('<br/>');

            this.view.info.show();
            this.view.message.html(message);
        },

        events: {

            '{entrar} click': function () {
                this.tryLogar();
            },

            '{usuario} enter': function () {
                this.tryLogar();
            },

            '{senha} enter': function () {
                this.tryLogar();
            }

        }

    });

});