yum.define([
	PI.Url.create('Financeiro', '/receita/relatorio/zap/page.html'),
	PI.Url.create('Financeiro', '/receita/relatorio/zap/page.css'),
	PI.Url.create('Financeiro', '/receita/relatorio/model.js'),
	PI.Url.create('Util', '/relatorio/page/page.js')
], function(html){
	
	Class('Financeiro.Receita.Relatorio.Zap.Page').Extend(Util.Relatorio.Page).Body({
	
		instances: function(){
			this.view.inject({
				body: html
			});
			
			this.title = 'Relatório Receita Zap';
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

			receitaModel.receitasPorCentral(this.getMes(), this.getAno()).ok(function(receitas){

		    	self.fill(receitas);

			}).error(function(message){
		    	Alert.error('Aviso', message);
		    });;
		},

		fill: function(receitas){
			var view = '';
			var totalReceita = 0;

	    	for (var i = 0; i < receitas.length; i++) {
	    		var item = receitas[i];

	    		totalReceita += item.Total;
				
				item.mes = this.getMes();
				item.ano = this.getAno();
	    		
				view += Mvc.Helpers.tpl(item, '<tr><td style="text-align:left"><a href="#Relatorio/Receita/Central/@{Id}/@{mes}/@{ano}">@{Nome}</a></td><td style="text-align:right">R$ @{PI.Convert.DolarToReal( this.Total )}</td></tr>');
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
				PI.Url.Hash.to('!Relatorio/Receita/' + unidade.Id);
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