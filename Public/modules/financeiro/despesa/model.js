yum.define([

], function () {

    Class('Financeiro.Despesa.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/Despesa');
        },

        validations: function () {
            return {
                'Data': new Mvc.Model.Validator.Required('Data de compra é obrigatório'),
                'Numero': new Mvc.Model.Validator.Required('Número de compra é obrigatório'),
                'Fornecedor': new Mvc.Model.Validator.Required('Fornecedor de compra é obrigatório'),
                'Unidade': new Mvc.Model.Validator.Required('Unidade de compra é obrigatório'),
                'Usuario': new Mvc.Model.Validator.Required('Usuário de compra é obrigatório'),
                'Items': new Mvc.Model.Validator.Required('Itens de compra é obrigatório'),
                'Anexos': new Mvc.Model.Validator.Required('Anexos da compra é obrigatório'),
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.Despesa.Model(json);

            model.Unidade = Unidade.Model.create().initWithJson(model.Unidade);
            model.Data = Lib.DataTime.create(json.Data, 'yyyy-MM-ddThh:mm:ss').getDateStringFromFormat('dd/MM/yyyy');

            return model;
        },

        getStatus: function () {
	        return Financeiro.Despesa.Status.convert(this.Status);
        },

        actions: {
            'remeter': '/remeter',
            'pagar': '/pagar',
            'autorizar': '/autorizar',
            'naopagar': '/naopagar',
            'naoautorizar': '/naoautorizar',
            'historicos': '/historicos',
            'excluir': '/excluir'
        }

    });

    Class('Financeiro.Despesa.Status').Static({
        ABERTA: 0,
        REMETIDA: 1,
        PAGA: 2,
        AUTORIZADA: 3,
	    TODOS: 5,
        NAO_PAGA: 6,
        NAO_AUTORIZADA: 7,


	    convert: function(status){
		    switch (status) {
			    case Financeiro.Despesa.Status.ABERTA: return 'Aberta';
			    case Financeiro.Despesa.Status.REMETIDA: return 'Remetida';
			    case Financeiro.Despesa.Status.PAGA: return 'Paga';
			    case Financeiro.Despesa.Status.AUTORIZADA: return 'Autorizada';
                case Financeiro.Despesa.Status.TODAS: return 'Todos';
                case Financeiro.Despesa.Status.NAO_PAGA: return 'Não Paga';
			    case Financeiro.Despesa.Status.NAO_AUTORIZADA: return 'Não Autorizada';
			    default: return 'Aberta';
		    }
	    }
    });

});