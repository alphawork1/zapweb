yum.define([
	PI.Url.create('Financeiro', '/receita/relatorio/unidade/page.html'),
	PI.Url.create('Financeiro', '/receita/relatorio/unidade/page.css'),
	PI.Url.create('Financeiro', '/receita/relatorio/model.js'),
	PI.Url.create('Util', '/relatorio/page/page.js')
], function(html){
	
	Class('Financeiro.Receita.Relatorio.Unidade.Page').Extend(Util.Relatorio.Page).Body({
	
		instances: function(){
			this.view.inject({
				body: html
			});

			this.tipoUnidade = Unidade.Tipo.COS;
			
			this.title = 'Relatório Receita Unidade';
		},

		viewDidLoad: function(){
			app.home.setTitle('Relatorio Receitas');

			this.setNomeRelatorio('Receita de Vendas');

		    this.base.viewDidLoad();
			
			this.loadAndFill();
		},

		loadAndFill: function(){
		    var self = this;
		    var receitaModel = new Financeiro.Receita.Relatorio.Model();

		    if (this.unidadeId == 0) return;

			receitaModel.receitaUnidade(this.unidadeId, this.getMes(), this.getAno()).ok(function(dados){

				if (dados.Unidade == null) return;

				self.view.nomeUnidade.html(dados.Unidade.Nome);
				
				self.breadcumb.setTitle('Relatório Receita ' + dados.Unidade.Nome);
				
		    	self.unidade.set(dados.Unidade.Nome);

		    	self.fill(dados.Receita);

			}).error(function(message){
		    	Alert.error('Aviso', message);
		    });;
		},

		fill: function(receita){
			var view = '';
			var totalReceita = 0;

	    	for (var i = 0; i < receita.Items.length; i++) {
	    		var item = receita.Items[i];

	    		totalReceita += item.Valor;
	    		
				view += Mvc.Helpers.tpl(item, '<tr><td>@{Dia}</td><td>@{Cliente}</td><td>R$ @{PI.Convert.DolarToReal( this.Valor )}</td></tr>');
	    	}

	    	this.view.tbody.html(view);
	    	this.view.totalReceitas.html( PI.Convert.DolarToReal( totalReceita ) );
		},

		clear: function(){
		    this.view.totalReceitas.html('0,00');
		    this.view.tbody.html('<tr><td colspan="3">Nenhum lançamento</td></tr>');
		},

		events: {

			'{this} select::unidade': function(unidade){
				PI.Url.Hash.to('!Relatorio/Receita/Unidade/' + unidade.Id);
			},
			
			'{this} change::mes': function(mes){
			    this.clear();

			    this.loadAndFill();
			},

			'{this} change::ano': function(ano){
			    this.clear();

			    this.loadAndFill();
			},
		
		}
	
	});
	
});