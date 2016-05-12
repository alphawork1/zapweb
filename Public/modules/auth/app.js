yum.define([
    PI.Url.create('Public', '/ui.config.js'),
    PI.Url.create('Public', '/app.css'),
    PI.Url.create('Auth', '/page.js'),
    PI.Url.create('UI', '/progress/progress.js')
], function (html) {
    
    Class('App').Extend(Mvc.Component).Body({

        instances: function () {
            this.progress = new UI.Progress({
                color: '#007acc'
            });
        },

        viewDidLoad: function () {
            

            this.base.viewDidLoad();
        },

        progressLoad: function (total) {

            if (!this.progress.isRender()) {
                this.progress.render($('#progress'));
            }

            this.progress.total(total);
        }

    });

});