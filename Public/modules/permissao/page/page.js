yum.define([
	PI.Url.create('Permissao', '/page/page.html'),
	PI.Url.create('Permissao', '/page/page.css'),
    PI.Url.create('Permissao', '/select/select.js'),
    PI.Url.create('Permissao', '/model.js'),
    PI.Url.create('Permissao', '/painel/painel.js')
], function (html) {

    Class('Permissao.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.select = new Permissao.Select({
                showAdd: true
            });

            this.painel = new Permissao.Painel({
                dataModel: 'Permissoes'
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
            
            this.title = 'Permissões';
        },

        viewDidLoad: function () {
            this.loadAndFill();

            this.base.viewDidLoad();
        },

        loadAndFill: function () {
            var self = this;

            Permissao.Model.create().tipos().ok(function (permissoes) {
                for (var i in permissoes) {
                    var permissao = permissoes[i];

                    self.painel.add(permissao);
                }
            });
        },

        load: function (grupo) {
            this.painel.clear();
            this.painel.set(grupo);
            this.model = grupo;
        },

        events: {
            
            '{salvar} click': function () {

                this.select.setValidate(true);

                if (this.model == undefined) {
                    this.select.setValidate(false);

                    Alert.error('Não foi possível salvar', 'Selecione um grupo de permissões');
                    return;
                }

                var self = this,
                    label = this.salvar.getLabel(),
                    s = this.injectViewToModel(this.model);

                if (!s.status) {
                    Alert.error('Não foi possível salvar', s.messages.join('</br>'));
                    return;
                }

                this.salvar.setLabel('Salvando ...').anime(true).lock();

                this.model.addPermissoes().ok(function () {
                    Alert.info('Sucesso', 'Permissões salvas com sucesso!');
                }).error(function (message) {
                    Alert.error('Nãoi foi possível salvar', message);
                }).done(function () {
                    self.salvar.setLabel(label).unlock().anime(false);
                });
            },

            '{select.tipo} change': function (item) {
                this.load(item.model);
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});