yum.define([
    PI.Url.create('UI.CheckBox', '/checkbox.html'),
    PI.Url.create('UI.CheckBox', '/checkbox.css')
], function (html) {

    Class('UI.CheckBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.classes = Application.getConfig('checkbox.classes');
            this.uuid = PI.Util.UUID();
        },

        isChecked: function () {
            return this.view.checkbox.is(':checked');
        },

        set: function (b, trigger) {
            trigger = trigger === false ? false : true;

            if (b) {
                this.view.container.addClass('checkbox-active');
            } else {
                this.view.container.removeClass('checkbox-active');
            }

            this.view.checkbox.prop('checked', b);
            if(trigger !== false) this.event.trigger('check', this.isChecked());
        },

        get: function () {
            return this.isChecked();
        },

        select: function () {
            var checked = this.view.container.hasClass('checkbox-active');
            if (checked) this.set(true, false);
            else this.set(false, false);
        },

        events: {

            '@container click': function () {
                this.view.container.toggleClass('checkbox-active');

                this.select();
            },

            '@span click': function () {
                this.view.container.toggleClass('checkbox-active');

                this.select();
            },

            '@checkbox change': function () {
                this.event.trigger('check', this.isChecked());
            }

        }

    });

});