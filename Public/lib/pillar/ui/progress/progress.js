yum.define([
	PI.Url.create('UI.Progress', '/progress.html'),
	PI.Url.create('UI.Progress', '/progress.css')
], function (html) {

    Class('UI.Progress').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.handlerProgress = null;

            this.color = '#6254b2';
        },

        viewDidLoad: function(){
			
            this.view.blue.css('background-color', this.color);
            
            this.base.viewDidLoad();
        },

        total: function (total) {
            var self = this;

            clearTimeout(this.handlerProgress);

            this.handlerProgress = setTimeout(function () {
                var t = (total * 100).toFixed(0);
                self.view.total.html(t + '%');

                total = Math.round((total * 346));

                self.view.blue.width(total);
            }, 200);
        }

    });

});