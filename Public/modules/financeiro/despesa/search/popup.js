yum.define([
	PI.Url.create('Financeiro', '/despesa/search/popup.html'),
	PI.Url.create('Financeiro', '/despesa/search/popup.css')
], function(html){

	Class('Financeiro.Despesa.Search.Popup').Extend(UI.Popup).Body({

		instances: function(){
			this.view.inject({
				title: '',
				content: html
			});

			this.position = 'top::left';
		},

		viewDidLoad: function(){
			this.view.header.hide();

			this.base.viewDidLoad();
		},

		select: function(){
			for(var i = 0 ; i < arguments.length ; i++){
			    var op = arguments[i];
				var e = this.view.element.find('[data=' + op + ']');

				e.show().find('i').toggleClass('financeiro-despesa-search-icon-show');

				this.event.trigger('select', op);
			}
		},

		events: {

			'li click': function(e){
				e = $(e);

				this.hide();
				this.select(e.attr('data'));
			}

		}

	});

});