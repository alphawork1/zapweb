yum.define([
	
], function () {

	Class('Administradora.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Administradora');
		},

		validations: function () {
			return {
				'Nome': new Mvc.Model.Validator.Required('Informe o nome da administradora')
			};
		},

		initWithJson: function (json) {
			var model = new Administradora.Model(json);

			if(json != null){
				model.Endereco = Endereco.Model.create().initWithJson(json.Endereco);
				model.Telefones = json.Telefones || [];
				for(var i in model.Telefones){
					model.Telefones[i] = Telefone.Model.create().initWithJson( model.Telefones[i] );
				}
			}
			
			return model;
		},

		actions: {
			'get': '/get?Id=:Id'
		}

	});
});