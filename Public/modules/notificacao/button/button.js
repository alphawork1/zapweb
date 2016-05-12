yum.define([
    PI.Url.create('Notificacao', '/button/button.html'),
    PI.Url.create('Notificacao', '/button/button.css'),
	PI.Url.create('Notificacao', '/popup/popup.js'),
    PI.Url.create('Notificacao', '/popup/item.js'),
    PI.Url.create('Notificacao', '/model.js')
], function (html) {

    Class('Notificacao.Button').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.popup = new Notificacao.Popup({
                offsetTop: 2,
                offsetLeft: 0
            });

            this.model = new Notificacao.Model();
        },

        viewDidLoad: function () {
            var self = this;
            
            this.popup.setReference(this.view.element);

            setTimeout(function(){
                self.reload();
            }, 1000);

            this.base.viewDidLoad();
        },

        show: function () {
            this.popup.show();
        },

        fill: function (notificacoes) {
            this.popup.clear();

            for (var i in notificacoes) {
                var item = new Notificacao.PopupItem({
                    notificacao: notificacoes[i]
                });

                this.popup.addItem(item);
            }
        },

        reload: function () {
            var self = this;

            this.model.all(1, 7).ok(function (nts) {
                self.fill(nts);
            });

            this.model.total().ok(function (n) {
                if (n.Total > 0) {
                    n.Total = n.Total > 9 ? '+9' : n.Total;
                    self.view.total.html(n.Total).show();
	                self.startBlink(n.Total);
                } else {
                    self.view.total.hide();
                } 
            });
        },

	    startBlink: function(total){
		    var counter = 0;

		    clearInterval(this.hanlder);

		    this.hanlder = setInterval(function(){

			    if(counter++ % 2 == 0){
				    document.title = total + ' mensagen(s)';
			    }else{
				    document.title = '';
			    }

		    }, 800);
	    },
	    
	    stopBlink: function(){

		    clearInterval(this.hanlder);
		    document.title = 'ZapWeb';
	        
	    },

        events: {

            '{element} click': function () {
                this.view.element.addClass('selected');
                this.show();

                this.view.total.hide();

	            this.stopBlink();

                this.model.clear();
            },

            '{popup} hide': function () {
                this.view.element.removeClass('selected');
            }

        }

    });

});