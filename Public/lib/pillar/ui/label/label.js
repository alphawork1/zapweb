yum.define([
	PI.Url.create('UI.Label', '/label.css')
], function () {

    Class('UI.Label').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<span style="@{style}"><div at="labelValue" class="ui-label-text @{classes}">@{label}</div> <div at="continue" class="ui-label-continue"></div> </span>');

            this.preserveNewLine = false;

            this.cutText = false;
            this.maxLengthText = Number.POSITIVE_INFINITY;
        },

        set: function (label) {
            
            if (this.preserveNewLine) {
                label = label.replace(/\n/gi, '</br>');
            }

            this.view.continue.hide();

            this.fullText = label;

            if (label != undefined && label.length > this.maxLengthText) {
                label = label.substring(0, this.maxLengthText);
                this.view.continue.css('display', 'inline-block');
            }

            this.view.labelValue.html(label);
        },

        get: function () {
            return this.view.labelValue.html();
        },

        events: {

            '@labelValue click': function () {
                this.event.trigger('click', this);
            },

            '@continue click': function () {
                this.view.labelValue.html(this.fullText);
                this.view.continue.hide();
            }
        }

    });

});