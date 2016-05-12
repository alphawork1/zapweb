yum.define([
	
], function () {

	Class('Financeiro.Receita.Relatorio.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/ReceitaRelatorio');
		},

		validations: function () {
			return {
				//'': new Mvc.Model.Validator.Required('')
			};
		},

		initWithJson: function (json) {
			var model = new Financeiro.Receita.Relatorio.Model(json);

			return model;
		},

		actions: {
			'totalPorCentral': '/totalPorCentral?centralId=:centralId&mes=:mes&ano=:ano',
            'totalPorZap': '/totalPorZap?mes=:mes&ano=:ano',
            'totalPorUnidade': '/totalPorUnidade?unidadeId=:unidadeId&mes=:mes&ano=:ano',
	        'receitaUnidadesPorCentral': '/receitaUnidadesPorCentral?centralId=:centralId&mes=:mes&ano=:ano',
            'receitaUnidade': '/receitaUnidade?unidadeId=:unidadeId&mes=:mes&ano=:ano',
            'receitasPorCentral': '/receitasPorCentral?mes=:mes&ano=:ano'
		}

	});
});