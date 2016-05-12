yum.define([
	PI.Url.create('Notificacao', '/page/item.html'),
	PI.Url.create('Notificacao', '/page/item.css')
], function (html) {

    Class('Notificacao.PageItem').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.model = new Notificacao.Model();
        },

        viewDidLoad: function(){

            if (!this.notificacao.Lida) {
                this.view.element.addClass('notificacao-page-item-nao-lida');
            }

            this.base.viewDidLoad();
        },

        lida: function(){
            this.view.element.removeClass('notificacao-page-item-nao-lida');
        },

        events: {

            '{element} click': function () {
                PI.Url.Hash.to(this.notificacao.Href);

                this.model.lida(this.notificacao.Id);
            }

        }

    });

});