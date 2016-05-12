yum.define([
	PI.Url.create('Usuario', '/page/page.html'),
	PI.Url.create('Usuario', '/page/page.css'),
    PI.Url.create('Usuario', '/page/auth.js'),
    PI.Url.create('Usuario', '/model.js'),
    PI.Url.create('Arquivo', '/painel.js')
], function (html) {

    Class('Usuario.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.apelido = new UI.TextBox({                
                placeholder: 'Apelido',
                dataModel: 'Apelido'
            });

            this.tratamento = new UI.TextBox({
                defaultValue: 'Sr.',
                placeholder: 'Sr.',
                dataModel: 'Tratamento'
            });

            this.nome = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Nome'
            });

            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.auth = new Usuario.PageAuth({
                dataModel: 'Account'
            });

            this.anexos = new Arquivo.Painel({
                dataModel: 'Anexos'
            });

            this.telefones = new Telefone.Painel({
                dataModel: 'Telefones'
            });
            
            this.salvar = new UI.Button({
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.title = 'Usuário';
        },

        viewDidLoad: function () {
            var self = this;
            var title = 'Adicionar Usuário';

            if (this.model.isNotNew()) {

                title = 'Editar Usuário';

                this.model.get().ok(function (usuario) {
                    self.model = usuario;

                    app.home.setTitle(title + ' - ' + usuario.Nome);

                    self.breadcumb.setTitle( usuario.Nome );

                    self.injectModelToView(usuario);
                });
            }

            app.home.setTitle(title);

            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this,
                    model = this.model;

                this.saveModel(model).ok(function (m) {
                    PI.Url.Hash.to('Usuario/Editar/' + m.Id);

                    Alert.info('Sucesso', 'Usuário salvo com sucesso!');
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});