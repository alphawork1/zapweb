yum.define([
	PI.Url.create('Arquivo', '/thumb.html'),
	PI.Url.create('Arquivo', '/thumb.css'),
    PI.Url.create('Arquivo', '/modal/modal.js'),
    PI.Url.create('Arquivo', '/preview/preview.js')
], function (html) {

    Class('Arquivo.Thumb').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.contextMenu = new UI.ContextMenu();
        },

        viewDidLoad: function () {

            this.contextMenu.setContext(this.view.element);

            this.visualizar = new UI.ContextMenuItem({
                label: 'Nova Guia',
                imageUrl: PI.Url.create('Arquivo', '/open.png').getUrl()
            });

            this.abrir = new UI.ContextMenuItem({
                label: 'Abrir',
                imageUrl: PI.Url.create('Arquivo', '/open.png').getUrl()
            });

            this.baixar = new UI.ContextMenuItem({
                label: 'Baixar',
                imageUrl: PI.Url.create('Arquivo', '/download.png').getUrl()
            });

            this.excluir = new UI.ContextMenuItem({
                label: 'Excluir',
                imageUrl: PI.Url.create('Arquivo', '/delete.png').getUrl()
            });

            this.contextMenu.addItem(this.visualizar);
            // this.contextMenu.addItem(this.abrir);
            this.contextMenu.addItem(this.baixar);
            this.contextMenu.addItem(this.excluir);

            this.base.viewDidLoad();
        },

        events: {

            '@img click': function () {
                if(this.arquivo.Tipo.indexOf('word') > 0){
                    PI.Url.to( Application.getConfig('model.url') + '/Arquivo/Download?hash=' + this.arquivo.Hash);
                }else{
                    var preview = new Arquivo.Preview({
                        arquivo: this.arquivo
                    });
    
                    preview.render(this.view.modal);   
                }
            },

            '{abrir} click': function () {
                var modal = new Arquivo.Modal({
                    showBackground: false,
                    image: {
                        url: Application.getConfig('model.url') + '/Arquivo/Thumb?hash=' + this.arquivo.Hash,
                        width: 550
                    }
                });

                modal.render(this.view.modal);

                modal.open();
            },

            '{visualizar} click': function () {
                this.view.link.attr('href', Application.getConfig('model.url') + '/Arquivo/Visualizar?hash=' + this.arquivo.Hash);
                this.view.link[0].click();
            },

            '{baixar} click': function () {
                PI.Url.to( Application.getConfig('model.url') + '/Arquivo/Download?hash=' + this.arquivo.Hash);
            },

            '{excluir} click': function () {
                var self = this;

                Confirm.show('Confirmação', 'Tem certeza que deseja excluir?', function (b) {

                    if (b) {
                        self.arquivo.remove().ok(function () {
                            self.destroy();
                        }).error(function (message) {
                            Alert.error('Não foi possível salvar', message);
                        }).done(function () {

                        });
                    }

                });

            }

        }

    });

});