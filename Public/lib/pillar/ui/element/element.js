yum.define([
	
], function (html) {

    Class('UI.Element').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('');
        },

        render: function (e, anime, append) {
            
            this.base.render(e, anime, append);

            this.view = new Mvc.View(e.html());
            this.view.element = e;
        }

    });

});