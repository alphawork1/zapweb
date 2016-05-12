yum.define([
	// PI.Url.create('UI.Paging', '/paging.html'),
	// PI.Url.create('UI.Paging', '/paging.css'),
	PI.Url.create('UI.Paging', '/pagination.js')
], function(html){
	
	Class('UI.Paging').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View('<div> <ul at="list" class="pagination-sm pagination"></ul> </div>');

			this.totalVisible = 1;
			this.totalPerPage = 1;
			this.model = null;

			this.twb = null;
		},

		viewDidLoad: function(){
		    
			this.config();

		    this.base.viewDidLoad();
		},

		config: function(){
			var self = this;

			this.model.paging.config({
				totalPerPage: this.totalPerPage
			});

			this.model.paging.onOk(function(data, paging){
				self.setTotal(paging.total);
			});
			
		},

		setTotal: function(total){
			var self = this;

			if (this.total == total) {
				return;
			}

			this.total = total;

			if (this.twb != null) {
				this.view.list.twbsPagination('destroy');
				this.twb = null;
			}

			if (this.total == 0) {
				return;
			}

			this.twb = this.view.list.twbsPagination({
				totalPages: total,
				visiblePages: this.totalVisible,
				first: 'Primeira',
		        prev: 'Anterior',
		        next: 'Próxima',
		        last: 'Última',
				onPageClick: function (event, page) {

					if (self.model != null) {
						self.model.paging.go(page);
					}

					self.event.trigger('select', page);
				}
			});
		    
		},

		destroy: function(){
			if (this.twb != null) this.twb.destroy();
		    this.base.destroy();
		},

		events: {
			
			'li click': function(){
				window.__window__ignore__click__event = true;
			}
		
		}
	
	});
	
});