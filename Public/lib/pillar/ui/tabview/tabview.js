yum.define([
	
], function () {

    Class('UI.TabView').Extend(Mvc.Component).Body({

        instances: function () {
            
        },

        init: function () {
            this.viewDidLoad();
            this.hideViews(false);
        },

        hideViews: function (animated) {
            if (animated) {
                this.view.element.find('[ui-tab-view]').slideUp();
            } else {
                this.view.element.find('[ui-tab-view]').hide();
            }
        },

        showView: function (view, animated) {
            if (animated) {
                this.view.element.find('[ui-tab-view="' + view + '"]').slideDown();
            } else {
                this.view.element.find('[ui-tab-view="' + view + '"]').show();
            }
            
        },

        events: {

            '[ui-tab-button] click': function (e) {
                var self = this,
                    view = $(e).attr('ui-tab-button');

                this.hideViews(true);

                setTimeout(function () {
                    self.showView(view, true);
                }, 100);
                
            }

        }

    });

});