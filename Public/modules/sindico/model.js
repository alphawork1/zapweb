yum.define([
	
], function () {

	Class('Sindico.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Sindico');
		},

		validations: function () {
			return {
				'Nome': new Mvc.Model.Validator.Required('Informe o nome do síndico')
			};
		},

		initWithJson: function (json) {
			var model = new Sindico.Model(json);

			if(json != undefined){
				model.Telefones = json.Telefones || [];
				for(var i in model.Telefones){
					model.Telefones[i] = Telefone.Model.create().initWithJson( model.Telefones[i] );
				}
			}			

			return model;
		},
		
		getTelefonesResidenciais: function(){
			var telefones = this.Telefones || [];
			var arr = [];
			
			for (var i = 0; i < telefones.length; i++) {
				var t = telefones[i];				
				if(t.Tipo == 1) arr.push(t.Numero);				
			}
			
			return arr.join('/');
		},
		
		getNumerosWhatsapp: function(){
			var telefones = this.Telefones || [];
			var arr = [];
			
			for (var i = 0; i < telefones.length; i++) {
				var t = telefones[i];				
				if(t.Tipo == 5) arr.push(t.Numero);				
			}
			
			return arr.join('/');
		},
		
		getTelefonesComerciais: function(){
			var telefones = this.Telefones || [];
			var arr = [];
			
			for (var i = 0; i < telefones.length; i++) {
				var t = telefones[i];				
				if(t.Tipo == 2) arr.push(t.Numero);				
			}
			
			return arr.join('/');
		},		
		
		getTelefonesCelular: function(){
			var telefones = this.Telefones || [];
			var arr = [];
			
			for (var i = 0; i < telefones.length; i++) {
				var t = telefones[i];				
				if(t.Tipo == 3) arr.push(t.Numero);				
			}
			
			return arr.join('/');
		},		

		actions: {
			
		}

	});
});