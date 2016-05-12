yum.define([
	PI.Url.create('Historico', '/item.html'),
	PI.Url.create('Historico', '/item.css')
], function (html) {

    Class('Historico.Item').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        }

    });

});