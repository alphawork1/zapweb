yum.define([
	PI.Url.create('Unidade', '/modal/modal.html'),
	// PI.Url.create('Unidade', '/modal/modal.css')
], function(html){
	
	Class('Unidade.Modal').Extend(UI.Modal).Body({
	
		instances: function(){
			this.view.inject({
				title: 'Selecione a unidade',
				body: html
			});

            this.ok = new UI.Button({
                label: 'Ok',
                classes: 'verde'
            });

            this.cancelar = new UI.Button({
                label: 'Cancelar',
                classes: 'cinza'
            });
		},

		init: function(){

			this.unidade = new Unidade.Search.TextBox({
				clearOnSelect: false,
				tipoUnidade: this.tipoUnidade
			});

		    this.base.init();
		},

		events: {

			'{ok} click': function(){
				var unidade = this.unidade.get();

				if (unidade != undefined){
					this.event.trigger('select', unidade);
				}
				
				this.hide();
			},
			
			'{unidade.search} enter': function(){
				var unidade = this.unidade.get();

				if (unidade == undefined) return;

				this.event.trigger('select', unidade);

				this.hide();
			},
			
			'{cancelar} click': function(){
				this.hide();
			}
		
		}
	
	});
	
});
