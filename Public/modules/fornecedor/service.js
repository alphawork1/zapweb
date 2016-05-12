yum.define([
    PI.Url.create('Fornecedor', '/page/page.js'),
    PI.Url.create('Fornecedor', '/model.js'),
    PI.Url.create('Fornecedor', '/search/page.js')
], function (html) {

    Class('Service.Fornecedor').Extend(PI.Service).Body({

        routes: {
            
            'Fornecedor/Editar/:Id': function (id) {
                var page = new Fornecedor.Page({
                    model: new Fornecedor.Model({ Id: id })
                });

                app.home.setPage(page);
            },

            'Fornecedor/Adicionar': function () {
                var page = new Fornecedor.Page({
                    model: new Fornecedor.Model()
                });

                app.home.setPage(page);
            },

            'Fornecedor/Pesquisar': function () {
                var page = new Fornecedor.Search.Page();

                app.home.setPage(page);
            }

        },

        events: {

        }

    });

});