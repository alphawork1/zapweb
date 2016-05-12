yum.define([
    PI.Url.create('UI.DateBox', '/datebox.html'),
    PI.Url.create('UI.DateBox', '/datepicker.js'),
    PI.Url.create('UI.DateBox', '/datepicker.css')
], function (html) {

    Class('UI.DateBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.textbox = new UI.TextBox({
                mask: 'data',
                iconLeft: 'fa fa-calendar',
                style: {
                    'text-indent': '16px'
                }
            });
        },

        viewDidLoad: function () {
            var self = this;

            this.textbox.setPlaceholder(this.placeholder);

            this.base.viewDidLoad();

            this.textbox.view.input.datepicker({
                format: "dd/mm/yyyy",
                language: "pt-BR",
                autoclose: true,
                todayHighlight: true
            }).on('changeDate', function () {
                self.event.trigger('change', self.get());
            });
        },

        get: function () {
            return this.textbox.get();
        },

        set: function (data) {
            this.textbox.set(data);
            this.textbox.view.input.datepicker("setDate", data);
        },

        setValidate: function (b) {
            this.textbox.setValidate(b);
        },

    });

});