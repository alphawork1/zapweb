yum.define([
	// PI.Url.create('UI.LoadMore', '/loadmore.html'),
	PI.Url.create('UI.LoadMore', '/loadmore.css'),
	PI.Url.create('UI.Button', '/button.js')
], function(html){
	
	Class('UI.LoadMore').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div class="ui-load-more"> <i class="icon-refresh"></i> <a at="label" href="javascript:">@{label}</a> </div>');

			this.label = 'Carregar mais dados';

			this.loading = false;

			this.page = 2;
		},

		viewDidLoad: function(){
		    var self = this;

		    this.model.page.config({
				totalPerPage: this.totalPerPage
			});

			this.model.page.onOk(function(data){
				self.loading = false;

				self.view.label.html(self.label);

				if (data.length == 0) {
					self.destroy();
				};
			});

		    this.base.viewDidLoad();
		},

		events: {
			
			'{element} click': function(){

				if (this.loading) {
					return;
				}

				this.view.label.html('Aguarde ...');

				this.loading = true;

				this.model.page.go(this.page++);
			}
		
		}
	
	});
	
});