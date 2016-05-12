yum.define([
	PI.Url.create('Financeiro', '/despesa/relatorio/unidade/page.html'),
	PI.Url.create('Financeiro', '/despesa/relatorio/unidade/page.css'),
	PI.Url.create('Financeiro', '/despesa/relatorio/relatorio.css'),
	PI.Url.create('Financeiro', '/receita/relatorio/model.js'),
	PI.Url.create('Financeiro', '/despesa/relatorio/model.js'),
	PI.Url.create('Util', '/relatorio/page/page.js')
], function(html){
	
	Class('Financeiro.Despesa.Relatorio.Unidade.Page').Extend(Util.Relatorio.Page).Body({
	
		instances: function(){
			this.view.inject({
				body: html
			});

			this.tipoUnidade = Unidade.Tipo.COS;
			
			this.title = 'Relatório Despesa Unidade';
		},

		viewDidLoad: function(){
			app.home.setTitle('Relatorio Despesa Unidade');

			this.setNomeRelatorio('Centro de Custo');

		    this.base.viewDidLoad();
			
			this.loadAndFill();
		},

		loadAndFill: function(){
		    var self = this;
		    var despesaModel = new Financeiro.Despesa.Relatorio.Model();

		    if (this.unidadeId == 0) return;

			despesaModel.relatorioUnidade(this.unidadeId, this.getMes(), this.getAno()).ok(function(relatorio){

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
			var cc = [];

			for (var i = 0; i < relatorio.Dados.length; i++) {
				var c = relatorio.Dados[i];
				var p = Financeiro.CentroCusto.Model.getLevesHierquia(c.Nome);

				for (var j = 0; j < p.length; j++) {
					cc[ p[j] ] = cc[ p[j] ] || 0;
					cc[ p[j] ] += c.Total;
				}

			    totalDespesa += c.Total;

			}

			for(var nome in cc){
			    var total = cc[nome]
	    		
				view += Mvc.Helpers.tpl({
					level: Financeiro.CentroCusto.Model.getLevel( nome ),
					nome: Financeiro.CentroCusto.Model.getUltimoNome( nome ),
					total: total
				}, '<li class="relatorio-page-item"><span class="level-@{level}">@{nome}</span><span>R$ <span>@{PI.Convert.DolarToReal( this.total ) }</span> </span></li>');			    
			}
			
	   //  	for (var i = 0; i < relatorio.Dados.length; i++) {
	   //  		var c = new Financeiro.CentroCusto.Model( relatorio.Dados[i] );

	   //  		totalDespesa += c.Total;
	    		
	   //  		c.Total = cc[c.Nome];

				// view += Mvc.Helpers.tpl(c, '<li class="relatorio-page-item"><span class="level-@{this.getLevel()}">@{this.getUltimoNome()}</span><span>R$ <span>@{PI.Convert.DolarToReal( this.Total ) }</span> </span></li>');
	   //  	}

	    	this.view.list.html(view);

	    	receitaModel.totalPorUnidade(this.unidadeId, this.getMes(), this.getAno()).ok(function(receita){
	    		self.calculaTotais(receita.Total || 0, totalDespesa);
	    	});		   

		},

		calculaTotais: function(receita, despesa){
			var lucro = receita - despesa;

	    	this.view.totalDespesa.html( PI.Convert.DolarToReal( despesa ) );
	    	this.view.resumoTotalDespesa.html( PI.Convert.DolarToReal( despesa ) );
	    	this.view.resumoTotalReceita.html( PI.Convert.DolarToReal( receita ) );

    		this.view.lucroBruto.html( 		PI.Convert.DolarToReal( lucro ) );
    		this.view.lucroLicenciado.html( PI.Convert.DolarToReal( lucro / 2 ) );
    		this.view.lucroCentral.html( 	PI.Convert.DolarToReal( lucro / 4 ) );
    		this.view.lucroZap.html( 		PI.Convert.DolarToReal( lucro / 4 ) );

    		if(lucro < 0){
    			this.view.lucroBruto.parent().addClass('relatorio-page-valor-negativo');
    			this.view.lucroLicenciado.parent().addClass('relatorio-page-valor-negativo');
    			this.view.lucroCentral.parent().addClass('relatorio-page-valor-negativo');
    			this.view.lucroZap.parent().addClass('relatorio-page-valor-negativo');
    		} 

		},

		clear: function(){
		    this.view.totalDespesa.html('0,00');
	    	this.view.resumoTotalDespesa.html('0,00');
	    	this.view.lucroBruto.html('0,00');
    		this.view.lucroLicenciado.html('0,00');
    		this.view.lucroCentral.html('0,00' );
    		this.view.lucroZap.html('0,00');
    		this.view.resumoTotalReceita.html('0,00');

    		this.view.lucroBruto.parent().removeClass('relatorio-page-valor-negativo');
			this.view.lucroLicenciado.parent().removeClass('relatorio-page-valor-negativo');
			this.view.lucroCentral.parent().removeClass('relatorio-page-valor-negativo');
			this.view.lucroZap.parent().removeClass('relatorio-page-valor-negativo');
		},

		events: {

			'{this} select::unidade': function(unidade){
				PI.Url.Hash.to('!Relatorio/Despesa/Unidade/' + unidade.Id);
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