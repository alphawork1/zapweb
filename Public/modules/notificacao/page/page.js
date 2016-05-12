yum.define([
	PI.Url.create('Notificacao', '/page/page.html'),
	PI.Url.create('Notificacao', '/page/page.css'),
    PI.Url.create('Notificacao', '/page/item.js'),
    PI.Url.create('Notificacao', '/model.js')
], function (html) {

    Class('Notificacao.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.model = new Notificacao.Model();

            this.loadmore = new UI.LoadMore({
                totalPerPage: 10,
                model: this.model
            });

            this.items = [];
            
            this.title = 'Notificações';
        },

        viewDidLoad: function () {
            app.home.setTitle('Notificações');

            this.loadAndFill();

            this.base.viewDidLoad();
        },

        loadAndFill: function () {
            var self = this;

            this.model.all().ok(function (nts) {
                for (var i in nts) {
                    var item = new Notificacao.PageItem({
                        notificacao: nts[i]
                    });

                    item.render(self.view.container);

                    self.items.push(item);
                }
            });
        },

        events: {

            '@todasLida click': function(){
                this.model.todasLida();

                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].lida();
                };
            }

        }

    });

});