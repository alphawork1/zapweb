yum.define([
	
], function () {

	Class('Condominio.Campanha.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Campanha');
		},

		validations: function () {
			return {
				'DataInicio': new Mvc.Model.Validator.Required('Informe a data de início'),
				'DataFim': new Mvc.Model.Validator.Required('Informe a data de término'),
				'HoraInicio': new Mvc.Model.Validator.Required('Informe a hora de início'),
				'HoraFim': new Mvc.Model.Validator.Required('Informe a hora do término'),
				'ValorAVista': new Mvc.Model.Validator.Required('Informe o valor à vista'),
				'ValorCheque': new Mvc.Model.Validator.Required('Informe o valor no cheque'),
				'Acrescimo': new Mvc.Model.Validator.Required('Informe os acréscimos'),
				'Desconto': new Mvc.Model.Validator.Required('Informe o desconto'),
				'Anexos': new Mvc.Model.Validator.Required('Carrege os modelos arquivos'),
			};
		},

		initWithJson: function (json) {
			var model = new Condominio.Campanha.Model(json);

			model.DataInicio = Lib.DataTime.create(json.DataInicio, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');
			model.DataFim = Lib.DataTime.create(json.DataFim, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');
			
			return model;
		},

		actions: {
			'all': '/all?condominioId=:CondominioId',
			'get': '/get?Id=:Id',
			'excluir': '/excluir'
		},
		
		getUrlPdf: function(){
			return PI.Url.create('localhost', '/campanha/download?campanhaId=' + this.Campanha.Id + '&nome=' + PI.File.filename( this.Nome ) + '&hash=' + this.Hash).getUrl();
		}

	});
});