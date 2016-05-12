yum.define([
    PI.Url.create('UI.TextBoxSelect', '/textboxselect.html'),
    PI.Url.create('UI.TextBoxSelect', '/textboxselect.css')
], function (html) {

    Class('UI.TextBoxSelect').Extend(UI.TextBox).Body({
        
        instances: function () {
            this.view.add(html);
        },

        select: function (b) {
            if (b) {
                this.view.input.addClass('ui-textbox-select-selected');
            } else {
                this.view.input.removeClass('ui-textbox-select-selected');
            }
        },

        events: {

            '@clear click': function () {
                this.select(false);
            }

        }

    });

});