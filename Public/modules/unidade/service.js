yum.define([
    PI.Url.create('Unidade', '/page/page.js'),
    PI.Url.create('Unidade', '/search/page.js'),
    PI.Url.create('Unidade', '/model.js')
], function (html) {

    Class('Service.Unidade').Extend(PI.Service).Body({

        routes: {

            'Unidade/Adicionar': function () {
                var page = new Unidade.Page({
                    model: new Unidade.Model()
                });

                app.home.setPage(page);
            },

            'Unidade/Editar/:Id': function (id) {
                var page = new Unidade.Page({
                    model: new Unidade.Model({ Id: id })
                });

                app.home.setPage(page);
            },

            'Unidade/Pesquisar': function () {
                var page = new Unidade.Search.Page();

                app.home.setPage(page);
            }
        }

    });

});