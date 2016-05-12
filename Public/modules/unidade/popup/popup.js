yum.define([
	PI.Url.create('Unidade', '/popup/popup.html'),
	PI.Url.create('Unidade', '/popup/popup.css'),
    PI.Url.create('UI.Popup', '/popup.js'),
    PI.Url.create('Unidade', '/select/select.js'),
    PI.Url.create('Unidade', '/model.js')
], function(html){
	
	Class('Unidade.Popup').Extend(UI.Popup).Body({
	
		instances: function(){
			this.view.inject({
                title: '',
                content: html
            });
			
			this.position = 'top::right';
			this.type = 'fixed';

			this.offsetTop = 10;

			this.unidade = new Unidade.Search.TextBox({
				clearOnSelect: false
			});

            this.ok = new UI.Button({
                label: 'Ok',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    // 'min-width': '120px'
                }
            });
		},

		viewDidLoad: function(){
		    this.view.header.hide();

		    this.base.viewDidLoad();
		},

		events: {
			
			'{ok} click': function(){
				this.hide();
				window.location.reload();
			},

            '{unidade} select': function(unidade){
                Unidade.Current = unidade;

                Unidade.Model.persistir(unidade);
            }
		
		}
	
	});
	
});