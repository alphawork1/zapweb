yum.define([
    PI.Url.create('Usuario', '/modal/modal.js'),
    PI.Url.create('Usuario', '/search/page.js'),
    PI.Url.create('Usuario', '/page/page.js')
], function (html) {

    Class('Service.Usuario').Extend(PI.Service).Body({

        routes: {

            'Usuario/Adicionar': function () {
                var page = new Usuario.Page({
                    model: new Usuario.Model()
                });

                app.home.setPage(page);
            },

            'Usuario/Editar/:Id': function (id) {
                var page = new Usuario.Page({
                    model: Usuario.Model.create().initWithJson({Id: id})
                });

                app.home.setPage(page);
            },

            'Usuario/Pesquisar': function () {
                var self = this,
                    modal = new Usuario.Search.Page();

                app.home.setPage(modal);

                modal.show();
            }
        }

    });

});