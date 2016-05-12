yum.define([
	PI.Url.create('Util', '/relatorio/popup.ano/popup.html'),
	PI.Url.create('Util', '/relatorio/popup.ano/popup.css')
], function(html){
	
	Class('Util.Relatorio.PopupAno').Extend(UI.Popup).Body({
	
		instances: function(){
			this.view.inject({
				title: '',
				content: html
			});
			
	        this.txtAno = new UI.TextBox({
		        placeholder: 'Ano',
		        dataModel: 'Ano',
		        mask: 'ano'
	        });

            this.bntOK = new UI.Button({                
                label: 'Ok',
                iconLeft: 'fa fa-check',
                classes: 'cinza'
            });

			this.offsetTop = -5;

			this.position = 'bottom::right';
			this.type = 'fixed';
		},

		viewDidLoad: function(){
		    this.view.header.hide();
		    
		    this.base.viewDidLoad();
		},

		select: function(){
			this.txtAno.setValidate(true);

			if (this.txtAno.get().replace(/_/, '').length < 4) {
				this.txtAno.setValidate(false);
				return;
			};

			this.event.trigger('click',  this.txtAno.get() );
			this.hide();		    
		},

		events: {
			
			'{bntOK} click': function(){
				this.select();
			},

			'{txtAno} enter': function(){
				this.select();  
			}
		
		}
	
	});
	
});