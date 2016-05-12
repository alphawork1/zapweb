yum.define([
	PI.Url.create('Arquivo', '/painel.html'),
	PI.Url.create('Arquivo', '/painel.css'),
    PI.Url.create('Arquivo', '/thumb.js'),
    PI.Url.create('Arquivo', '/model.js')
], function (html) {

    Class('Arquivo.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.baixar = new UI.Button({
                label: 'Baixar',
                iconLeft: 'fa fa-plus',
                classes: 'cinza',
            });

            this.excluir = new UI.Button({
                label: 'Excluir',
                iconLeft: 'fa fa-plus',
                classes: 'vermelho',
            });

            this.extensions = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'pdf'];

            this.arquivos = [];
        },

        init: function(){
            this.base.init();

            this.upload = new UI.Upload({
                label: 'Enviar Arquivo',
                baseUrl: Application.getConfig('model.url') + '/arquivo',
                classes: 'btn btn-sm button cinza',
                config: {
                    extensions: this.extensions,
                    unidade: 'Kilobytes',
                    maxSize: 5242880 // 5MB
                }
            });

        },

        viewDidLoad: function () {
            this.view.empty.hide();

            this.base.viewDidLoad();
        },

        get: function () {
            return this.arquivos;
        },

        set: function (arquivos) {
            for (var i = 0; i < arquivos.length; i++) {
                this.addThumb(arquivos[i]);
            }
        },

        addThumb: function (arquivo) {
            arquivo = new Arquivo.Model(arquivo);

            var index = this.arquivos.length;
            var self = this;
            var thumb = new Arquivo.Thumb({
                arquivo: arquivo
            });

            this.arquivos.push(arquivo);

            thumb.render(this.view.container);

            thumb.event.listen('view::did::destroy', function () {
                self.arquivos.splice(index, 1);
                if (self.arquivos.length == 0) self.view.empty.show();
            });

            this.view.empty.hide();
        },

        events: {
            
            '{upload} success': function (arquivo) {
                this.addThumb(arquivo);
            },

            '{upload} error': function (message) {
                Alert.error('Não foi possível enviar nota', message);
            }

        }

    });

});