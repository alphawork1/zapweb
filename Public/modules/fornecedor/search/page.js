yum.define([
	PI.Url.create('Fornecedor', '/search/page.html'),
	PI.Url.create('Fornecedor', '/search/page.css'),
    PI.Url.create('Fornecedor', '/table/table.js'),
    PI.Url.create('Util', '/lineselect/lineselect.js'),
    PI.Url.create('Fornecedor', '/search/model.js')
], function (html) {

    Class('Fornecedor.Search.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.razaoSocial = new UI.TextBox({
                placeholder: 'Razão Social',
                dataModel: 'RazaoSocial'
            });

            this.fantasia = new UI.TextBox({
                placeholder: 'Fantasia',
                dataModel: 'Fantasia'
            });

            this.cnpj = new UI.TextBox({
                placeholder: 'Cnpj',
                dataModel: 'Cnpj'
            });

            this.contato = new UI.TextBox({
                placeholder: 'Nome do Contato',
                dataModel: 'Contato'
            });

            this.table = new Fornecedor.Table({
                messageEmpty: 'Nenhum fornecedor encontrado',
                columns: ['editar']
            });

            this.model = new Fornecedor.Model();

            this.paging = new UI.Paging({
                totalPerPage: 10,
                totalVisible: 3,
                model: this.model
            });

            this.addNew = new UI.Button({
                label: 'Adicionar Filtro',
                iconLeft: 'fa fa-plus',
                classes: 'cinza'
            });

            this.lineselect = new Util.LineSelect();

            this.pesquisar = new UI.Button({
                label: 'Pesquisar',
                iconLeft: 'fa fa-search',
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
            
            this.title = 'Pesquisar Fornecedor';
        },

        viewDidLoad: function () {
            app.home.setTitle('Pesquisar Fornecedor');

            this.lineselect.showOnClick(this.addNew);

            this.lineselect.add('Razão Social', this.view.razaoSocial, true)
                           .add('Fantasia', this.view.fantasia, true)
                           .add('Cnpj', this.view.cnpj);

            this.base.viewDidLoad();
        },

        search: function () {
            var self = this;

            this.model.all().ok(function (fornecedores, paging) {
                self.table.set(fornecedores);
            });
        },

        events: {

            '{pesquisar} click': function(){
                var self = this;

                this.injectViewToModel(this.model, {
                    validate: false
                });

                this.search();
            }

        }

    });

});