yum.define([
	PI.Url.create('Condominio', '/campanha/modal/modal.html'),
	// PI.Url.create('Condominio', '/campanha/modal/modal.css')
], function(html){

	Class('Condominio.Campanha.Modal').Extend(UI.Modal).Body({

		instances: function(){
			this.view.inject({
				title: 'Nova Campanha',
				body: html
			});
			
			this.dataInicio = new UI.DateBox({
				placeholder: 'Data'
			});
			
			this.dataFim = new UI.DateBox({
				placeholder: 'Data'
			});
			
			this.horaInicio = new UI.TextBox({
				mask: 'hora',
				placeholder: 'Horário'
			});
			
			this.horaFim = new UI.TextBox({
				mask: 'hora',
				placeholder: 'Horário'
			});
			
			this.valorAVista = new UI.TextBox({
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.valorCheque = new UI.TextBox({
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.valorDuplex = new UI.TextBox({
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.desconto = new UI.TextBox({
				mask: 'financeira',
				placeholder: 'R$ 0,00'
			});
			
			this.upload = new UI.Upload({
				config: {
					extensions: ['docx'],
					maxSize: 20000,
					unidade: 'docx'
				}
			});
		}

	});

});