yum.define([
	PI.Url.create('Fornecedor', '/page/page.html'),
	PI.Url.create('Fornecedor', '/page/page.css'),
    PI.Url.create('Endereco', '/painel.js'),
    PI.Url.create('Contato', '/painel.js')
], function (html) {

    Class('Fornecedor.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            //dados
            this.razaoSocial = new UI.TextBox({
                placeholder: 'Razão Social',
                dataModel: 'RazaoSocial'
            });

            this.fantasia = new UI.TextBox({
                placeholder: 'Nome Fantasia',
                dataModel: 'Fantasia'
            });

            this.cnpj = new UI.TextBox({
                placeholder: 'Cnpj',
                dataModel: 'Cnpj',
                mask: 'cnpj'
            });

            this.site = new UI.TextBox({
                placeholder: 'www',
                dataModel: 'Site'
            });

            //endereco
            this.endereco = new Endereco.Painel({
                dataModel: 'Endereco'
            });
            
            //contato
            this.contato = new Contato.Painel({
                dataModel: 'Contato'
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
            
            this.title = 'Fornecedor';
        },

        viewDidLoad: function () {
            var self = this;

            if (this.model.isNew()) {
                app.home.setTitle('Adicionar Fornecedor');
            } else {
                app.home.setTitle('Editar Fornecedor');

                this.model.get().ok(function (model) {
                    self.model = model;
                    
                    self.breadcumb.setTitle( model.getFantasia()  );
                    
                    self.injectModelToView(model);
                }).error(function (message) {
                    Alert.error('Não foi possível', message);
                });

            }

            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this;

                this.saveModel(this.model).ok(function (model, isNew) {
                    Alert.info('Sucesso', 'Fornecedor salvo com sucesso');

                    PI.Url.Hash.to('Fornecedor/Editar/' + model.Id);
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});