yum.define([
	PI.Url.create('Unidade', '/page/page.html'),
	PI.Url.create('Unidade', '/page/page.css'),
    PI.Url.create('Unidade', '/tipo/select.js'),
    PI.Url.create('Unidade', '/search/textbox.js'),
    PI.Url.create('Unidade', '/table/table.js'),
    PI.Url.create('Usuario', '/table/table.js'),
    PI.Url.create('Usuario', '/search/textbox.js'),
    PI.Url.create('Usuario', '/modal/modal.js'),
    PI.Url.create('Cidade', '/search/textbox.js'),
    PI.Url.create('Arquivo', '/painel.js')
], function (html) {

    Class('Unidade.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = new UI.TextBox({
                placeholder: 'Nome da Unidade',
                dataModel: 'Nome'
            });

            this.endereco = new UI.TextBox({
                placeholder: 'Endereço da unidade',
                dataModel: 'Endereco'
            });

            this.configEmail = new UI.TextBox({
                placeholder: 'Email do remetente',
                dataModel: 'EmailRemetente'
            });

            this.configSenhaEmail = new UI.TextBox({                
                placeholder: 'Senha',
                dataModel: 'SenhaEmailRemetente'
            });

            this.tipo = new Unidade.Tipo.Select({
                dataModel: 'Tipo'
            });

            this.usuarios = new Usuario.Table({
                dataModel: 'Usuarios'
            });

            this.addUsuario = new UI.Button({
                label: 'Adicionar Usuário',
                classes: 'cinza',
            });

            this.searchUsuario = new Usuario.Search.TextBox();

            this.searchUnidade = new Unidade.Search.TextBox();

            this.cidade = new Cidade.Search.TextBox({
                dataModel: 'Cidade'
            });

            this.unidades = new Unidade.Table({
                dataModel: 'Unidades',
                columns: ['excluir']
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
            
            this.title = 'Unidade';
        },

        viewDidLoad: function () {
            var self = this;
            var title = 'Adicionar Unidade';

            if (this.model.isNotNew()) {

                title = 'Editar Unidade';

                this.model.get().ok(function (unidade) {
                    app.home.setTitle(title + ' - ' + unidade.Nome);

                    self.breadcumb.setTitle( unidade.Nome );

                    self.injectModelToView(unidade);
                    
                    if(unidade.Tipo == Unidade.Tipo.ZAP){
                        // self.view.rowTipo.hide();
                    }
                });
            }

            app.home.setTitle(title);

            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var model = this.model;

                this.saveModel(model).ok(function (m) {
                    PI.Url.Hash.to('Unidade/Editar/' + m.Id);

                    Alert.info('Sucesso', 'Unidade salva com sucesso!');
                });
            },

            '{searchUnidade} select': function (unidade) {
                this.unidades.add(unidade);
            },

            '{searchUsuario} select': function (usuario) {
                this.usuarios.add(usuario);
            },

            '{addUsuario} click': function () {
                var self = this,
                    modal = new Usuario.Modal();

                modal.render(this.view.addUsuario, true);

                modal.show();

                modal.event.listen('model::added', function (usuario) {
                    self.usuarios.add(usuario);
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});