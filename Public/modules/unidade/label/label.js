yum.define([
	PI.Url.create('Unidade', '/label/label.html'),
	PI.Url.create('Unidade', '/label/label.css'),
    PI.Url.create('Unidade', '/model.js'),
    PI.Url.create('Unidade', '/popup/popup.js')
], function (html) {

    Class('Unidade.Label').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = Unidade.Current.Nome;

            this.popup = new Unidade.Popup();
        },

        viewDidLoad: function(){
            
            this.popup.showOnClick(this.view.nome);

            this.base.viewDidLoad();
        },

        events: {
            
            '{popup.unidade} select': function(unidade){
                this.view.nome.html(unidade.Nome);
            }

        }

    });

});