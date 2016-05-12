yum.define([
	PI.Url.create('Sindico', '/model.js')
], function () {

	Class('Condominio.Status').Static({
		CLIENTE: 1,
		ARQUIVADO: 2,
		EM_NEGOCIACAO: 3
	});

	Class('Condominio.Model').Extend(Mvc.Model.Base).Body({

		instances: function () {

		},

		init: function () {
			this.base.init('/Condominio');
		},

		validations: function () {
			return {
				'Nome': new Mvc.Model.Validator.Required('Informe o nome do condomínio'),
				'NotaAparencia': new Mvc.Model.Validator.Required('Informe a nota da aparência do condomínio'),
				'ClasseSocial': new Mvc.Model.Validator.Required('Informe a classe social do condomínio'),
				'NotaCadastrador': new Mvc.Model.Validator.Required('Informe a nota do cadastrador para condomínio')
			};
		},

		initWithJson: function (json) {
			if(PI.Object.isEmpty( json )) return;
			
			var model = new Condominio.Model(json);

			model.Unidade = Unidade.Model.create().initWithJson(model.Unidade);
			model.DataCadastro = Lib.DataTime.create(json.DataCadastro, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');
			model.DataUltimaCampanha = Lib.DataTime.create(json.DataUltimaCampanha, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');
			model.Endereco = Endereco.Model.create().initWithJson(json.Endereco);
			model.Sindico = Sindico.Model.create().initWithJson(json.Sindico);
			model.Zelador = Sindico.Model.create().initWithJson(json.Zelador);
			model.Administradora = Administradora.Model.create().initWithJson(json.Administradora);
			
			if(json.ProximoContato != undefined){
				model.ProximoContato = Lib.DataTime.create(json.ProximoContato, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');				
			}
			
			return model;
		},
		
		getUrl: function(){
			return '#Condominio/Editar/' + this.Id;
		},

		actions: {
			'imprimir': '/imprimir?ids=:ids',
			'prospectos': '/prospectos?unidadeId=:id',
			'updateVariaveis': '/updateVariaveis',
			'enviarDocumento': '/enviarDocumento?Id=:Id&Assunto=:Assunto&Mensagem=:Mensagem&arquivoIds=:arquivoIds&Emails=:Emails',
			'addDocumento': '/addDocumento?Id=:Id&DocumentoId=:DocumentoId&ArquivoId=:ArquivoId',
			'updateRank': '/updateRank',
			'updateStatus': '/updateStatus'
		}

	});
});