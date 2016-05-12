yum.define([
    
], function () {

    Class('Financeiro.Despesa.Relatorio.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/DespesaRelatorio');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.Despesa.Relatorio.Model(json);

            return model;
        },

        actions: {
            'relatorioUnidade': '/relatorioUnidade?unidadeId=:Id&mes=:mes&ano=:ano',
            'relatorioCentral': '/relatorioCentral?centralId=:Id&mes=:mes&ano=:ano',
            'relatorioZap': '/relatorioZap?mes=:mes&ano=:ano'
        }

    });

});