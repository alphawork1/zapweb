yum.define([
			PI.Url.create('UI.Menu', '/item.html'),
			PI.Url.create('UI.Menu', '/item.css')
], function (html) {

    Class('UI.Menu.Item').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.enable = true;
        },

        events: {

            '{element} click': function () {
                if (this.enable) {
                    this.event.trigger('click');
                }
                
                if (this.href != undefined) {
                    PI.Url.Hash.to(this.href);
                }
            }

        }

    });

});