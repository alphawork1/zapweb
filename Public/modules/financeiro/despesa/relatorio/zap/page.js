yum.define([
	PI.Url.create('Financeiro', '/despesa/relatorio/zap/page.html'),
	PI.Url.create('Financeiro', '/despesa/relatorio/zap/unidade.html'),
	PI.Url.create('Financeiro', '/despesa/relatorio/zap/page.css'),
	PI.Url.create('Financeiro', '/despesa/relatorio/relatorio.css'),
	PI.Url.create('Financeiro', '/receita/relatorio/model.js'),
	PI.Url.create('Financeiro', '/despesa/relatorio/model.js'),
	PI.Url.create('Util', '/relatorio/page/page.js')
], function(html, tplUnidade){
	
	Class('Financeiro.Despesa.Relatorio.Zap.Page').Extend(Util.Relatorio.Page).Body({
	
		instances: function(){
			this.view.inject({
				body: html
			});
			
			this.title = 'Relatório Despesa Zap';
		},

		viewDidLoad: function(){
			app.home.setTitle('Relatorio Despesa Zap');

			this.setNomeRelatorio('Centro de Custo');

		    this.base.viewDidLoad();

		    this.view.nomeUnidade.html(Unidade.Current.Nome);
			
			this.breadcumb.setTitle('Relatório Despesa ' + Unidade.Current.Nome);
			
		    this.unidade.hide();

			this.loadAndFill();
		},

		loadAndFill: function(){
			var self = this;
		    var despesaModel = new Financeiro.Despesa.Relatorio.Model();

		    if (this.unidadeId == 0) return;

		    despesaModel.relatorioZap(this.getMes(), this.getAno()).ok(function(relatorio){

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

		     	for (var j = 0; j < relatorio.Dados[i].CentroCustos.length; j++) {
		     		var c = new Financeiro.CentroCusto.Model( relatorio.Dados[i].CentroCustos[j] );

		     		total += c.Total;

		     		v += Mvc.Helpers.tpl(c, '<li class="relatorio-page-item"><span class="level-2}">@{Nome}</span><span>R$ <span>@{PI.Convert.DolarToReal( this.Total ) }</span> </span></li>');
		     	}

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

		    receitaModel.totalPorZap(this.getMes(), this.getAno()).ok(function(receita){
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
			
			'{this} change::mes': function(mes){
			    this.clear();

			    this.view.linkReceita.attr('href', '#Relatorio/Receita/Zap/' + this.getMes() + '/' + this.getAno());

				this.loadAndFill();  
			},

			'{this} change::ano': function(ano){
			    this.clear();

			    this.view.linkReceita.attr('href', '#Relatorio/Receita/Zap/' + this.getMes() + '/' + this.getAno());

				this.loadAndFill();			    
			},
		
		}

	});
	
});