yum.define([
	PI.Url.create('UI.TextAreaToken', '/textareatokendata.html'),
	PI.Url.create('UI.TextAreaToken', '/textareatokendata.css')
], function (html) {

    Class('UI.TextAreaTokenData').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        events: {

            '@close click': function () {
                this.event.trigger('delete', this);
                this.destroy();
            }

        }

    });

});