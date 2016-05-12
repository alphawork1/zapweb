yum.define([
    PI.Url.create('Financeiro', '/despesa/page/page.js'),
	PI.Url.create('Financeiro', '/receita/page/page.js'),
    PI.Url.create('Financeiro', '/receita/search/page.js'),
	PI.Url.create('Financeiro', '/despesa/search/page.js'),
    PI.Url.create('Financeiro', '/despesa/model.js'),
    PI.Url.create('Financeiro', '/despesa/relatorio/unidade/page.js'),
    PI.Url.create('Financeiro', '/despesa/relatorio/central/page.js'),
    PI.Url.create('Financeiro', '/despesa/relatorio/zap/page.js'),
    PI.Url.create('Financeiro', '/receita/relatorio/unidade/page.js'),
    PI.Url.create('Financeiro', '/receita/relatorio/central/page.js'),
    PI.Url.create('Financeiro', '/receita/relatorio/zap/page.js')
], function (html) {

    Class('Service.Financeiro').Extend(PI.Service).Body({

        load: function (app) {
            this.base.load(app);
        },

        routes: {

            'Relatorio/Despesa/Unidade/:Id': function (id) {
                var page = new Financeiro.Despesa.Relatorio.Unidade.Page({
                    unidadeId: id,
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Despesa/Unidade/:Id/:Mes/:Ano': function (id, mes, ano) {
                var page = new Financeiro.Despesa.Relatorio.Unidade.Page({
                    unidadeId: id,
                    mes: mes,
                    ano: ano
                });

                app.home.setPage(page);
            },

            'Relatorio/Despesa/Central/:Id': function (id) {
                var page = new Financeiro.Despesa.Relatorio.Central.Page({
                    unidadeId: id,
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Despesa/Central/:Id/:Mes/:Ano': function (id, mes, ano) {
                var page = new Financeiro.Despesa.Relatorio.Central.Page({
                    unidadeId: id,
                    mes: mes,
                    ano: ano
                });

                app.home.setPage(page);
            },

            'Relatorio/Despesa/Zap': function (id) {
                var page = new Financeiro.Despesa.Relatorio.Zap.Page({
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Central/:Id': function (unidadeId) {
                var page = new Financeiro.Receita.Relatorio.Central.Page({
                    unidadeId: unidadeId,
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Central/:Id/:Mes/:Ano': function (unidadeId, mes, ano) {
                var page = new Financeiro.Receita.Relatorio.Central.Page({
                    unidadeId: unidadeId,
                    mes: mes,
                    ano: ano
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Unidade/:Id': function (unidadeId) {
                var page = new Financeiro.Receita.Relatorio.Unidade.Page({
                    unidadeId: unidadeId,
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Unidade/:Id/:Mes/:Ano': function (unidadeId, mes, ano) {
                var page = new Financeiro.Receita.Relatorio.Unidade.Page({
                    unidadeId: unidadeId,
                    mes: mes,
                    ano: ano
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Zap': function (unidadeId) {
                var page = new Financeiro.Receita.Relatorio.Zap.Page({
                    unidadeId: unidadeId,
                    mes: Lib.DataTime.CurrentMesIndex(),
                    ano: Lib.DataTime.CurrentAno()
                });

                app.home.setPage(page);
            },

            'Relatorio/Receita/Zap/:Mes/:Ano': function (mes, ano) {
                var page = new Financeiro.Receita.Relatorio.Zap.Page({
                    mes: mes,
                    ano: ano
                });

                app.home.setPage(page);
            },

            'Receita/Adicionar': function () {
                var page = new Financeiro.Receita.Page({
                    model: new Financeiro.Receita.Model()
                });

                app.home.setPage(page);
            },

            'Receita/Editar/:Id': function (id) {
                var page = new Financeiro.Receita.Page({
                    model: new Financeiro.Receita.Model({ Id: id })
                });

                app.home.setPage(page);
            },

            'Receita/Pesquisar': function () {
                var page = new Financeiro.Receita.Search.Page();

                app.home.setPage(page);
            },

            'Despesa/Adicionar': function () {
                var page = new Financeiro.Despesa.Page({
                    model: new Financeiro.Despesa.Model()
                });

                app.home.setPage(page);
            },

            'Despesa/Editar/:Id': function (id) {
                var page = new Financeiro.Despesa.Page({
                    model: new Financeiro.Despesa.Model({ Id: id })
                });

                app.home.setPage(page);
            },

	        'Despesa/Pesquisar': function () {
		        var page = new Financeiro.Despesa.Search.Page();

		        app.home.setPage(page);
	        },

            'Relatorio/CentroCusto': function () {
                var page = new Financeiro.CentroCusto.Relatorio.Page();

                app.home.setPage(page);
            }

        },

        events: {

        }

    });

});