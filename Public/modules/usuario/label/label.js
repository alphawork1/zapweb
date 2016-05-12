yum.define([
	PI.Url.create('Usuario', '/label/label.html'),
	PI.Url.create('Usuario', '/label/label.css'),
    PI.Url.create('Usuario', '/model.js'),
    PI.Url.create('Usuario', '/popup/popup.js')
], function (html) {

    Class('Usuario.Label').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = Usuario.Current.Nome;

            this.popup = new Usuario.Popup({
                offsetTop: 10,
                offsetLeft: 0
            });
        },

        viewDidLoad: function(){
		
            this.popup.setReference(this.view.element);

            this.base.viewDidLoad();
        },

        events: {

            '{element} click': function () {
                this.popup.show();

                this.view.element.addClass('selected');
            },

            '{popup} hide': function () {
                this.view.element.removeClass('selected');
            }

        }

    });

});