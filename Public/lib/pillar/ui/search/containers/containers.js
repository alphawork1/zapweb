yum.define([
	PI.Url.create('UI.Search', '/containers/containers.html'),
	PI.Url.create('UI.Search', '/containers/containers.css')
], function (html) {

    Class('UI.Search.Containers').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        viewDidLoad: function () {
            this.view.element.css('transform', 'translateY(-' + this.view.element.height() + 'px)');
            this.base.viewDidLoad();
        },

        open: function () {
            this.view.element.css('transform', 'translateY(0px)');
        },

        close: function () {
            this.view.element.css('transform', 'translateY(-' + this.view.element.height() + 'px)');
        },

        addListItem: function (items) {
            this.view.list.html('');

            for (var i = 0; i < items.length; i++) {
                this.view.list.append('<li class="ui-search-list-item"><a href="' + items[i].href + '">' + items[i].label + '</a></li>');
            }            
        },

        events: {

            '{window} click': function (e, ee) {

                //if ($(ee.target).parents(this.view.getElementIdWithHash()).length == 0 &&
                //    $(ee.target).parents(this.textbox.view.getElementIdWithHash()).length == 0) {
                //    this.close();
                //}

            }

        }

    });

});