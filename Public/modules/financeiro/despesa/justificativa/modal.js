yum.define([
	PI.Url.create('Financeiro', '/despesa/justificativa/modal.html'),
	// PI.Url.create('Financeiro', '/despesa/justificativa/modal.css')
], function(html){
	
	Class('Financeiro.Despesa.Justificativa.Modal').Extend(UI.Modal).Body({
	
		instances: function(){
			this.view.inject({
				title: 'Justificativa',
				body: html
			});

            this.salvar = new UI.Button({
                label: 'Salvar',
                classes: 'verde'
            });

            this.cancelar = new UI.Button({
                label: 'Cancelar',
                classes: 'cinza'
            });

			this.textarea = new UI.TextArea({
				placeholder: 'Informe uma justificativa',
				autosize: true
			});
		},

		events: {
			
			'{salvar} click': function(){

				this.textarea.setValidate(true);

				if (this.textarea.get().length == 0) {
					this.textarea.setValidate(false);
					Alert.error('Alerta', 'Informe uma justificativa para continuar');
					return;
				};

				this.event.trigger('save', this.textarea.get());
				this.hide();
			},

			'{cancelar} click': function(){
				this.hide();
			}
		
		}
	
	});
	
});