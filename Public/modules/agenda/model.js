yum.define([
	
], function () {

	Class('Agenda.Tipo').Static({
		HISTORICO: 1,
		MANUAL: 2
	});

	Class('Agenda.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Agenda');
		},

		validations: function () {
			return {
				//'': new Mvc.Model.Validator.Required('')
			};
		},

		initWithJson: function (json) {
			var model = new Agenda.Model(json);
			
			model.DataTime = Lib.DataTime.create(json.Data, 'yyyy-MM-ddThh:mm:ss');
			model.Data = model.DataTime.getDateStringFromFormat('yyyy-MM-dd hh:mm:ss');
			model.DataFinal = model.DataTime.addMinutes(30).getDateStringFromFormat('yyyy-MM-dd hh:mm:ss');
			
			return model;
		},

		actions: {
			'feed': '/feed?start=:start&end=:end&unidadeId=:unidadeId'
		}

	});
});