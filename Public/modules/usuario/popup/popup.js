yum.define([
	PI.Url.create('Usuario', '/popup/popup.html'),
	PI.Url.create('Usuario', '/popup/popup.css'),
    PI.Url.create('UI.Popup', '/popup.js'),
    PI.Url.create('Auth', '/model.js')
], function (html) {

    Class('Usuario.Popup').Extend(UI.Popup).Body({

        instances: function () {
            this.view.inject({
                title: '',
                content: html
            });

            this.position = 'top::right';
            this.type = 'fixed';

            this.silhuete = PI.Url.create('Usuario', '/popup/silhouette96.png');
        },

        viewDidLoad: function(){			
            this.view.header.hide();

            this.base.viewDidLoad();
        },

        events: {

            '@sair click': function () {
                Auth.Model.create().sair().ok(function(){
                    window.location = '/';
                });;
            },

            '@configuracao click': function () {
                Alert.show('Aguarde', 'Função não implementada ainda');
            },

            '@meusDados click': function () {
	            var self = this;

	            setTimeout(function(){
		            PI.Url.Hash.to('Usuario/Editar/' + Usuario.Current.Id);
		            self.hide();
	            }, 1);
            }

        }

    });

});