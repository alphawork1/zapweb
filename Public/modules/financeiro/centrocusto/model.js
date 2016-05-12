yum.define([

], function () {

    Class('Financeiro.CentroCusto.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/CentroCusto');
        },

        validations: function () {
            return {
                'Nome': new Mvc.Model.Validator.Required('Nome é obrigatório')
            };
        },

        initWithJson: function (json) {
            var model = new Financeiro.CentroCusto.Model(json);

            return model;
        },

        actions: {
            'all': '/all?tipo=:tipo',
            'excluir': '/excluir'
        },

        getNome: function () {
            return this.Nome.replace(/\:/gi, ' <span class="centro-custo-seta"></span> ')
        },

        getLevel: function(){
            return Financeiro.CentroCusto.Model.getLevel(this.Nome);
        },

        getUltimoNome: function(){
            return Financeiro.CentroCusto.Model.getUltimoNome(this.Nome);
        },

        'static getLevel': function(level){
            return level.split(':').length;
        },

        'static getUltimoNome': function(nome){
            var n = nome.split(':');

            return n[ n.length - 1 ];
        },

        'static getLevesHierquia': function(nome){
            var index = nome.indexOf(':');
            var arr = [];

            while(index > -1){
                arr.push( nome.substring(0, index) );
                index = nome.indexOf(':', index + 1);
            }

            arr.push(nome);

            return arr;
        },

    });

    Class('Financeiro.CentroCusto.Tipo').Static({
        ENTRADA: 0,
        SAIDA: 1,
        TODOS: 2
    });

});