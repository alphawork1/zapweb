yum.define([
	PI.Url.create('Historico', '/painel.html'),
	PI.Url.create('Historico', '/painel.css'),
    PI.Url.create('Historico', '/item.js'),
    PI.Url.create('Historico', '/model.js')
], function (html) {

    Class('Historico.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();
        },

        set: function (historicos) {

            this.view.list.html('');

            for (var i = 0; i < historicos.length; i++) {
                var item = new Historico.Item({
                    historico: Historico.Model.create().initWithJson(historicos[i])
                });

                item.render(this.view.list);
            }
        }

    });

});