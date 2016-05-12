yum.define([
	PI.Url.create('Util', '/lineselect/lineselect.html'),
	PI.Url.create('Util', '/lineselect/lineselect.css')
], function(html){
	
	Class('Util.LineSelect').Extend(UI.Popup).Body({
	
		instances: function(){
			this.view.inject({
				title: '',
				content: html
			});

			this.position = 'top::left';

			this.items = [];
		},

		viewDidLoad: function(){
		    this.view.header.hide();
		    
		    this.base.viewDidLoad();
		},

		add: function(label, e, show){
			var tpl = '<li data="@{label}" class="line-select-list-item"><i class="fa fa-check line-select-icon"></i>@{label}</li>';

			var el = this.view.container.append( Mvc.Helpers.tpl({label: label}, tpl) );

			if(show === true){
				el.find('i').addClass('line-select-icon-show');
			}else{
				e.hide();
			}

			this.items[label] = e;

		    return this;
		},

		events: {

			'li click': function(e){
				e = $(e);

				e.find('i').toggleClass('line-select-icon-show');

				this.items[ e.attr('data') ].toggle();

				this.hide();
			}

		}
	
	});
	
});