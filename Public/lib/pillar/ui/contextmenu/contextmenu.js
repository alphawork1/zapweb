yum.define([
	PI.Url.create('UI.ContextMenu', '/contextmenu.html'),
	PI.Url.create('UI.ContextMenu', '/contextmenu.css'),
    PI.Url.create('UI.ContextMenu', '/item.js')
], function (html) {

    Class('UI.ContextMenu').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.baseUrl = PI.Url.create('UI.ContextMenu', '/');
            this.target = null;
        },

        setContext: function (context) {
            var self = this;

            $(context).bind("contextmenu", function (e) {
                self.target = $(e.target);
                self.view.context.show();
                self.view.context.offset({ left: e.pageX, top: e.pageY });;
                e.preventDefault();

                self.event.trigger('open', self.target);
            });
        },

        addItem: function (item) {
	        var self = this;

            item.render(this.view.items);

	        item.event.listen('click', function(){
		        self.event.trigger('select', item);
	        });
        },

        events: {

            '{window} click': function (e, ee) {
                if ($(ee.target).parents('.ui-context-menu').length == 0) {
                    this.view.context.hide();
                    this.event.trigger('close');
                }
            },

            '.ui-context-menu-item click': function () {
                this.view.context.hide();
            }

        }

    });

});