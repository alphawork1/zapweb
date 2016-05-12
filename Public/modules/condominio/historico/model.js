yum.define([
	
], function () {

	Class('Condominio.Historico.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Historico');
		},

		validations: function () {
			return {
				'Data': new Mvc.Model.Validator.Required('Informe a data do contato'),
				'Descricao': new Mvc.Model.Validator.Required('Informe a descrição do contato'),
				'ProximoContato': new Mvc.Model.Validator.Required('Informe a data do próximo contato'),
				'Hora': new Mvc.Model.Validator.Required('Informe o horário do próximo contato'),
				'Rank': new Mvc.Model.Validator.Required('Informe a classificação do condomínio')
			};
		},

		initWithJson: function (json) {
			var model = new Historico.Model(json);

			model.Data = Lib.DataTime.create(json.Data, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');
			
			model.ProximoContatoDataTime = Lib.DataTime.create(json.ProximoContato, 'yyyy-MM-ddThh:mm:ss'); 
			model.ProximoContato = model.ProximoContatoDataTime.getDateStringFromFormat('dd/MM/yyyy');

			return model;
		},
		
		setProximoContato: function(data, hora){
			var d = Lib.DataTime.create(json.ProximoContato, 'yyyy-MM-ddThh:mm:ss');
			this.ProximoContato = moment(data + 'T' + hora + ':00', 'DD/MM/YYYY mm:ss').format('YYYY-MM-DDTmm:ss')
		},

		actions: {
			'all': '/all?condominioId=:CondominioId',
			'updateDate': '/updateDate'
		}

	});
});