yum.define([
	PI.Url.create('Financeiro', '/receita/table/row.html'),
	//PI.Url.create('Financeiro', '/receita/table/row.css'),
	PI.Url.create('Financeiro', '/receita/table/model.js')
], function(html){

	Class('Financeiro.Receita.TableRow').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);

			this.dia = new UI.TextBox({
				placeholder: 'Dia',
				classes: 'financeiro-table-control',
				dataModel: 'Dia',
				mask: 'dia'
			});

			this.cliente = new UI.TextBox({
				placeholder: 'Cliente',
				classes: 'financeiro-table-control',
				dataModel: 'Cliente'
			});

			this.valor = new UI.TextBox({
				placeholder: 'R$ 0,00',
				dataModel: function (model, method, value) {
					if (method == 'set') {
						model.Valor = PI.Convert.RealToDolar(value);
					} else {
						return PI.Convert.DolarToReal(model.Valor);
					}
				},
				mask: 'financeira',
				classes: 'financeiro-table-control',
				style: {
					'text-align': 'right'
				}
			});

			this.excluir = new UI.Button({
				label: 'Excluir',
				iconLeft: 'fa fa-trash-o',
				classes: 'vermelho'
			});

		},

		getValor: function(){
		    return PI.Convert.RealToDolar(this.valor.get());
		 },

		get: function(){
			var model = new Financeiro.Receita.Item.Model();
			var s = this.injectViewToModel(model);

			if(!s.status){
			    throw s.messages;
			}

			return model;
		 },

		set: function(item){
			this.injectModelToView(item);
		 },

		events: {

			'{valor} keyup': function () {
				this.event.trigger('valor::change');
			},

			'{excluir} click': function () {
				this.destroy();
			}

		}

	});

});