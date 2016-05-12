yum.define([
    PI.Url.create('UI.TextArea', '/textarea.html'),
    PI.Url.create('UI.TextArea', '/textarea.css'),
    PI.Url.create('UI.TextArea', '/autosize.js')
], function (html) {

    Class('UI.TextArea').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.classes = Application.getConfig('textarea.classes');
        },

        viewDidLoad: function () {
            this.resize();
            this.base.viewDidLoad();
        },

        autosize: function (b) {
            var self = this;

            this.event.listen('view::did::load', function () {
                self.view.textarea.autosize();
                self.view.textarea.css('resize', 'none');
            });
        },

        get: function () {
            return this.view.textarea.val();
        },

        set: function (value) {
            this.view.textarea.val(value);
        },

        resize: function () {
            this.view.textarea.trigger('autosize.resize');
        },
        
        setValidate: function (b) {
            if (b) {
                this.view.textarea.removeClass('ui-textarea-invalid');
            } else {
                this.view.textarea.addClass('ui-textarea-invalid');
            }
        },

        destroy: function () {
            this.base.destroy();
            this.view.textarea.trigger('autosize.destroy');
        },

        resize: function () {
            var h = this.height;

            if (h == undefined) return;

            this.view.textarea.css('min-height', h);
            this.view.textarea.trigger('autosize.resize');
        },

        clear: function () {
            this.view.textarea.val('');
        },

        events: {

            '@textarea focus': function (ee, e) {
                this.event.trigger('focus');
            },

            '@textarea focusout': function (ee, e) {
                this.event.trigger('lostfocus');
            },

            '@textarea keydown': function (ee, e) {
                this.event.trigger('keydown', this.get());
            },

            '@textarea keyup': function (e, ee) {

                if (ee.keyCode == PI.KEYBOARD.ENTER) {
                    var b = this.event.trigger('enter');
                    if (b === true || b === false) return b;
                }

                this.event.trigger('keyup', this.get());
            },

            '@textarea keypress': function () {
                this.event.trigger('keypress', this.get());
            },

            '@textarea change': function () {
                this.event.trigger('change', this.get());
            }
        }
    });

});