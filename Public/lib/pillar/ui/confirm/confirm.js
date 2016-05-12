yum.define([
    PI.Url.create('UI.Confirm', '/confirm.html'),
    PI.Url.create('UI.Confirm', '/confirm.css'),
    PI.Url.create('UI.Button', '/button.js')
], function (html) {

    Class('UI.Confirm').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.ok = new UI.Button({
                label: 'Sim',
                classes: Application.getConfig('confirm.ok.classes')
            });

            this.cancel = new UI.Button({
                label: 'Não',
                classes: Application.getConfig('confirm.cancelar.classes')
            });

            this.cb = function () { };
        },

        show: function (title, message, cb) {
            this.view.title.html(title);
            this.view.message.html(message);
            this.cb = cb || PI.Function.cb;

            this.view.element.fadeIn('fast');
            this.opened = true;

            return this;
        },

        close: function () {
            this.view.element.fadeOut('fast');
            this.opened = false;

            this.restore();

            return this;
        },

        restore: function () {
            //this.ok.setLabel(this.defaults.labelOk);
            //this.cancel.setLabel(this.defaults.labelCancel);
        },

        events: {

            '{ok} click': function () {
                this.close();
                this.cb(true);
            },

            '{ok} enter': function () {
                this.close();
                this.cb(true);
            },

            '{cancel} click': function () {
                this.close();
                this.cb(false);
            },

            '{cancel} enter': function () {
                this.close();
                this.cb(false);
            }

        }

    });

    window.Confirm = new UI.Confirm();
    Confirm.render($('body'));
});