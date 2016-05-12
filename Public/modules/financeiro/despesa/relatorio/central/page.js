yum.define([
	PI.Url.create('Financeiro', '/despesa/relatorio/central/page.html'),
	PI.Url.create('Financeiro', '/despesa/relatorio/central/unidade.html'),
	PI.Url.create('Financeiro', '/despesa/relatorio/central/page.css'),
	PI.Url.create('Financeiro', '/despesa/relatorio/relatorio.css'),
	PI.Url.create('Financeiro', '/receita/relatorio/model.js'),
	PI.Url.create('Financeiro', '/despesa/relatorio/model.js'),
	PI.Url.create('Util', '/relatorio/page/page.js')
], function(html, tplUnidade){
	
	Class('Financeiro.Despesa.Relatorio.Central.Page').Extend(Util.Relatorio.Page).Body({
	
		instances: function(){
			this.view.inject({
				body: html
			});

			this.tipoUnidade = Unidade.Tipo.CENTRAL;
			
			this.title = 'Relatório Despesa Central';
		},

		viewDidLoad: function(){
			app.home.setTitle('Relatorio Despesa Central');

			this.setNomeRelatorio('Centro de Custo');

		    this.base.viewDidLoad();

			this.loadAndFill();
		},

		loadAndFill: function(){
			var self = this;
		    var despesaModel = new Financeiro.Despesa.Relatorio.Model();

		    if (this.unidadeId == 0) return;

		    despesaModel.relatorioCentral(this.unidadeId, this.getMes(), this.getAno()).ok(function(relatorio){

				//seta o nome da unidade selecionada
		    	self.view.nomeUnidade.html(relatorio.Unidade.Nome);
				
				self.breadcumb.setTitle('Relatório Despesa ' + relatorio.Unidade.Nome);
				
		    	self.unidade.set(relatorio.Unidade.Nome);

		    	self.fill(relatorio);

		    }).error(function(message){
		    	Alert.error('Aviso', message);
		    });;

		},

		fill: function(relatorio){
			 var self = this;
		     var view = '';
		     var receitaModel = new Financeiro.Receita.Relatorio.Model();
		     var totalDespesa = 0;

		     for (var i = 0; i < relatorio.Dados.length; i++) {
		     	var r = relatorio.Dados[i];
		     	var total = 0;
		     	var v = '';
		     	var cc = [];

				for (var j = 0; j < relatorio.Dados[i].CentroCustos.length; j++) {
					var c = relatorio.Dados[i].CentroCustos[j];
					var p = Financeiro.CentroCusto.Model.getLevesHierquia(c.Nome);

					for (var k = 0; k < p.length; k++) {
						cc[ p[k] ] = cc[ p[k] ] || 0;
						cc[ p[k] ] += c.Total;
					}

					total += c.Total;

				}

				for(var nome in cc){
				    var _total = cc[nome]

					v += Mvc.Helpers.tpl({
						level: Financeiro.CentroCusto.Model.getLevel( nome ),
						nome: Financeiro.CentroCusto.Model.getUltimoNome( nome ),
						total: _total
					}, '<li class="relatorio-page-item"><span class="level-@{level}">@{nome}</span><span>R$ <span>@{PI.Convert.DolarToReal( this.total ) }</span> </span></li>');			    
				}

		     	// for (var j = 0; j < relatorio.Dados[i].CentroCustos.length; j++) {
		     	// 	var c = new Financeiro.CentroCusto.Model( relatorio.Dados[i].CentroCustos[j] );

		     	// 	total += c.Total;
	    		
	    			// c.Total = cc[c.Nome];

		     	// 	v += Mvc.Helpers.tpl(c, '<li class="relatorio-page-item"><span class="level-@{this.getLevel()}">@{this.getUltimoNome()}</span><span>R$ <span>@{PI.Convert.DolarToReal( this.Total ) }</span> </span></li>');
		     	// }

		     	if (total > 0) {		     		
			     	view += Mvc.Helpers.tpl({
			     		unidadeId: r.Unidade.Id,
			     		nomeUnidade: r.Unidade.Nome,
			     		totalDespesa: PI.Convert.DolarToReal( total ),		     		
			     		items: v,
			     		mes: this.getMes(),
			     		ano: this.getAno()
			     	}, tplUnidade);
		     	}

		     	totalDespesa += total;
		     }

		    receitaModel.totalPorCentral(this.unidadeId, this.getMes(), this.getAno()).ok(function(receita){
		    	self.calculeTotais(receita.Total, totalDespesa);
		    });

		     this.view.container.html(view);
		},

		calculeTotais: function(receita, despesa){
			var lucro = receita - despesa;
			
			this.view.totalDespesa.html( PI.Convert.DolarToReal( despesa ) );
			this.view.resumoTotalReceita.html( PI.Convert.DolarToReal( receita ) );
		    this.view.resumoTotalDespesa.html( PI.Convert.DolarToReal( despesa ) );
		    this.view.lucroBruto.html( PI.Convert.DolarToReal( lucro ) );

		    this.view.lucroLicenciado.html( PI.Convert.DolarToReal( lucro / 2 ) );
		    this.view.lucroCentral.html( PI.Convert.DolarToReal( lucro / 4 ) );
		    this.view.lucroZap.html( PI.Convert.DolarToReal( lucro / 4 ) );		    
		},

		clear: function(){
		    this.view.totalDespesa.html('0,00');
    		this.view.resumoTotalReceita.html('0,00');
	    	this.view.resumoTotalDespesa.html('0,00');
	    	this.view.lucroBruto.html('0,00');
    		this.view.lucroLicenciado.html('0,00');
    		this.view.lucroCentral.html('0,00' );
    		this.view.lucroZap.html('0,00');
		},

		events: {
			
			'{this} select::unidade': function(unidade){
				PI.Url.Hash.to('!Relatorio/Despesa/Central/' + unidade.Id);
			},

			'{this} change::mes': function(mes){
			    this.clear();

			    this.view.linkReceita.attr('href', '#!Relatorio/Receita/Zap/' + this.getMes() + '/' + this.getAno());

				this.loadAndFill();  
			},

			'{this} change::ano': function(ano){
			    this.clear();

			    this.view.linkReceita.attr('href', '#!Relatorio/Receita/Zap/' + this.getMes() + '/' + this.getAno());

				this.loadAndFill();			    
			},
		
		}

	});
	
});