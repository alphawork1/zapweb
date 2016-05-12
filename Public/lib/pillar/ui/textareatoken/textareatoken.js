yum.define([
	PI.Url.create('UI.TextAreaToken', '/textareatoken.html'),
	PI.Url.create('UI.TextAreaToken', '/textareatoken.css'),
    PI.Url.create('UI.TextAreaToken', '/textareatokendata.js'),
    PI.Url.create('UI.TextArea', '/textarea.js')
], function (html) {

    Class('UI.TextAreaToken').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.textarea = new UI.TextArea({ autosize: true });
        },

        init: function () {
            this.textarea.label = this.label;
            this.textarea.style.height = this.height;
        },

        add: function (token) {
            var self = this;

            token.render(this.view.metadata);

            token.event.listen('delete', function () {
                self.resize(0);
            });

            this.resize(20);
        },

        resize: function (height) {
            height = height || 0;
            var hMeta = this.view.metadata.height() + height;
            var hArea = this.textarea.view.element.css('min-height', hMeta);
            this.textarea.resize();
        },

        get: function () {
            return this.textarea.get();
        },

        events: {

            '{textarea} keydown': function () {
                var self = this;

                setTimeout(function () {
                    var text = self.textarea.get();

                    //substitui nova linha
                    text = text.replace(new RegExp('\n', 'gi'), '<br/>');

                    //carrega o conteudo
                    self.view.content.html(text);

                }, 1);
            }

        }

    });

});