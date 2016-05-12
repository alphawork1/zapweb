yum.define([
	PI.Url.create('Financeiro', '/despesa/search/page.html'),
	PI.Url.create('Financeiro', '/despesa/search/page.css'),
	PI.Url.create('Financeiro', '/status/select.js'),
	PI.Url.create('Financeiro', '/despesa/search/table.js'),
	PI.Url.create('Financeiro', '/despesa/search/model.js'),
	PI.Url.create('Util', '/lineselect/lineselect.js')
], function(html){

	Class('Financeiro.Despesa.Search.Page').Extend(PI.Page).Body({

		instances: function(){
			this.view = new Mvc.View(html);

			this.dataInicio = new UI.DateBox({
				placeholder: 'Data Inicio',
				dataModel: 'DataInicio'
			});

			this.dataFim = new UI.DateBox({
				placeholder: 'Data Fim',
				dataModel: 'DataFim'
			});

			this.numero = new UI.TextBox({
				placeholder: 'Número',
				dataModel: 'Numero'
			});

			this.valorMenor = new UI.TextBox({
				placeholder: 'R$ 0,00',
				mask: 'financeira',
				dataModel: function (model, method, value) {
					if (method == 'set') {
						model.ValorMenor = PI.Convert.RealToDolar(value);
					}
				}
			});

			this.valorMaior = new UI.TextBox({
				placeholder: 'R$ 0,00',
				mask: 'financeira',
				dataModel: function (model, method, value) {
					if (method == 'set') {
						model.ValorMaior = PI.Convert.RealToDolar(value);
					}
				}
			});

			this.fornecedor = new Fornecedor.Search.TextBox({
				placeholder: 'Fornecedor',
				dataModel: 'Fornecedor',
				clearOnSelect: false
			});

			this.unidade = new Unidade.Search.TextBox({
				clearOnSelect: false,
				dataModel: 'Unidade'
			});

			this.usuario = new Usuario.Search.TextBox({
				clearOnSelect: false,
				placeholder: 'Usuário',
				dataModel: 'Usuario'
			});

			this.status = new Financeiro.Status.Select({
				dataModel: 'Status'
			});

			this.table = new Financeiro.Despesa.Search.Table();

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

			this.model = new Financeiro.Despesa.Search.Model();

			this.paging = new UI.Paging({
				totalPerPage: 10,
				totalVisible: 3,
				model: this.model
			});
			
			this.title = 'Pesquisar Despesa';
		},

		viewDidLoad: function(){
			this.base.viewDidLoad();

			app.home.setTitle('Pesquisar Despesa');

			// this.unidade.set(Unidade.Current);

			this.lineselect.showOnClick(this.addNew);

			this.lineselect.add('Data', this.view.rowdata, true)
						   .add('Número', this.view.rownumero)
						   .add('Status', this.view.rowstatus, true)
						   .add('Unidade', this.view.rowunidade, true)
						   .add('Fornecedor', this.view.rowfornecedor, true)
						   .add('Comprado Por', this.view.rowusuario)
						   .add('Valor', this.view.rowvalor);
		},

		events: {

			'{pesquisar} click': function(){
				var self = this;
				var label = this.pesquisar.getLabel();

				this.injectViewToModel(this.model);

				this.pesquisar.setLabel('Pesquisando ...').anime(true).lock();

				this.table.loading(true);

				this.model.pesquisar().ok(function(despesas, paging){
					self.pesquisar.setLabel(label).anime(false).unlock();
					self.table.loading(false).set(despesas);
				});
			}

		}

	});

});