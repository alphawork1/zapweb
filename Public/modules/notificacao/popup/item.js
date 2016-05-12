yum.define([
	PI.Url.create('Notificacao', '/popup/item.html'),
	PI.Url.create('Notificacao', '/popup/item.css')
], function (html) {

    Class('Notificacao.PopupItem').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.model = new Notificacao.Model();
        },

        viewDidLoad: function () {

            if (!this.notificacao.Lida) {
                this.view.element.addClass('notificacao-popup-item-nao-lida');
            }

            this.base.viewDidLoad();
        },

        events: {

            '{element} click': function () {
                var self = this;

                setTimeout(function () {
                    self.popup.hide();
                    PI.Url.Hash.to(self.notificacao.Href);

                    self.model.lida(self.notificacao.Id);

                    self.view.element.removeClass('notificacao-popup-item-nao-lida');
                }, 1);
            }

        }

    });

});