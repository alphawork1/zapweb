yum.define([
	PI.Url.create('UI.Modal', '/modal.html'),
	PI.Url.create('UI.Modal', '/modal.css')
], function (html) {

    Class('UI.Modal').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.opened = false;

            this.width = '550px';

            this.showBackground = true;
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();

            this.view.modal.css('width', this.width);

            if (this.showBackground) {
                this.view.element.addClass('ui-modal-background');
            }

            this.hide();
        },

        open: function () {
            this.show();
            this.opened = true;
            return this;
        },

        close: function () {
            this.hide();
            this.opened = false;
            return this;
        },

        hiddenHeader: function () {
            this.view.header.hide();
            this.view.close.hide();
        },

        setTitle: function (title) {
            this.view.header.html(title);
        },

        events: {

            '@close click': function () {
                this.close();
                this.event.trigger('close');
            },

            '{window} click': function (e, ee) {
                if (this.opened && $(ee.target).parents('.ui-modal-container').length == 0) {
                    e = this.view.element;
                }
            }

        }

    });

});