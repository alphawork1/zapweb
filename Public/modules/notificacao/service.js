yum.define([
    PI.Url.create('Notificacao', '/model.js'),
    PI.Url.create('Notificacao', '/page/page.js')
], function (html) {

    Class('Service.Notificacao').Extend(PI.Service).Body({

        load: function (app) {
            this.base.load(app);
        },

        routes: {

            'Notificacao': function () {
                var page = new Notificacao.Page();

                app.home.setPage(page);
            }

        },

        events: {

            '{EventGlobal} new::notificacao': function () {
                app.home.notificacao.reload();
            }
        }

    });

});