yum.define([
	PI.Url.create('UI.Upload', '/upload.html'),
	PI.Url.create('UI.Upload', '/upload.css')
], function (html) {

    Class('UI.Upload').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.uploading = false;
            this.baseUrl = '';
            this.config = {
                extensions: [],
                maxSize: 0,
                unidade: ''
            };
            
            this.uuid = PI.Util.UUID();

            this.label = 'Adicionar';
            this.style = {
                width: 'auto',
            };

            this.classes = 'btn m-b-xs btn-md btn-success btn-addon';
        },

        init: function () {

            this.submit = new UI.Button({
                label: this.label,
                iconLeft: 'fa fa-cloud-upload',
                classes: this.classes,
                style: {
                    'width': this.style.width
                }
            });
        },

        isValid: function () {
            var file = this.view.file[0],
				nome = file.files[0].name,
				extension = PI.File.extension(nome),
				size = file.size;

            if (size >= this.config.maxSize) {
                Alert.error('Formato Inválido', 'O arquivo excedeu o tamanho máximo permitido de ' + this.config.maxSize + ' ' + this.config.unidade + '.');
                this.removeClass();
                b = false;
            } else if (PI.Array.contains(this.config.extensions, extension)) {
                this.removeClass();
                b = true;
            } else {
                Alert.error('Formato Inválido', 'O tipo <b>' + extension + '</b> não é suportado. <br/>Entre com um arquivo no formato: ' + this.config.extensions.join(', '));
                this.addClass('ui-upload-error');
                b = false;
            }

            return b;
        },

        sendFile: function () {
            var self = this
                data = new FormData();

            data.append('file', this.view.file[0].files[0]);

            this.anime(true);

            $.ajax({
                url: this.baseUrl.concat('/add'),
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function (protocol, textStatus, jqXHR) {
                    self.anime(false);

                    if (protocol.status == 'ok') {
                        self.event.trigger('success', protocol.data);
                    } else {
                        self.event.trigger('error', protocol.message);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self.anime(false);
                    self.event.trigger('error', 'Error desconhecido');
                },
                crossDomain: Application.getConfig('ajax.cors') || false,			
                xhrFields: {
                    withCredentials: Application.getConfig('ajax.credentials') || false
                }
            });
        },

        anime: function (b) {
            if (b) {
                this.submit.setLabel('Enviando ...').anime(true).lock();
            } else {
                this.submit.setLabel(this.label).anime(false).unlock();
            }
        },

        addClass: function (classe) {
            this.removeClass().addClass(classe);
        },

        removeClass: function () {
            return this.view.element.removeClass('ui-upload-uploading')
                                    .removeClass('ui-upload-uploaded')
                                    .removeClass('ui-upload-error');
        },

        remove: function (file) {
            var request = new PI.Request();

            request.get(this.baseUrl.concat('/remove?hash=' + file.Hash));
        },

        events: {

            '{submit} click': function (ee, event) {
                this.view.file.click();
            },

            '@file change': function () {
                if (!this.isValid()) return;

                this.sendFile();
            }

        }

    });

});