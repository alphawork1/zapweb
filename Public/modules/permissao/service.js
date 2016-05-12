yum.define([
    PI.Url.create('Permissao', '/model.js'),
    PI.Url.create('Permissao', '/page/page.js')
], function (html) {

    Class('Service.Permissao').Extend(PI.Service).Body({

        routes: {

            'Permissao/Gerenciar': function () {
                var page = new Permissao.Page();

                app.home.setPage(page);
            }
        }

    });

});