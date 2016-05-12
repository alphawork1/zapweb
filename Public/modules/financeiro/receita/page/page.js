yum.define([
	PI.Url.create('Financeiro', '/receita/page/page.html'),
	PI.Url.create('Financeiro', '/receita/page/page.css'),
	PI.Url.create('Financeiro', '/receita/model.js'),
	PI.Url.create('Financeiro', '/receita/table/table.js'),
    PI.Url.create('Unidade', '/search/textbox.js'),
	PI.Url.create('Util', '/meses/select.js')
], function (html) {

    Class('Financeiro.Receita.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

	        this.table = new Financeiro.Receita.Table({
		        dataModel: 'Items'
	        });

	        this.mes = new Util.Meses.Select({
		        dataModel: 'Mes'
	        });

	        this.ano = new UI.TextBox({
		        placeholder: 'Ano',
		        dataModel: 'Ano',
		        mask: 'ano'
	        });

            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false,
                dataModel: 'Unidade'
            });

            this.salvar = new UI.Button({                
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.excluir = new UI.Button({                
                label: 'Excluir',
                iconLeft: 'fa fa-times',
                classes: 'vermelho',
                style: {
                    'min-width': '120px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.title = 'Receita';
        },

        viewDidLoad: function () {
	        var self = this;

            app.home.setTitle('Receitas');

	        if(this.model.isNotNew()){

                this.excluir.show();

                this.model.get().ok(function(model){
                    self.model = model;

                    self.injectModelToView(model);
                });

            }else{

                this.excluir.hide();
                
                this.ano.set( Lib.DataTime.CurrentAno() );
                this.unidade.set(Unidade.Current);
		        this.table.addRow();
	        }

            this.base.viewDidLoad();
        },

	    refresh: function(){
		    var self = this;
		    var mes = this.mes.get();
		    var ano = this.ano.get();

		    if(ano.length != 4) return;

		    this.model.find(mes, ano).ok(function(receita){

			    if(self.model.Id == receita.Id) return;

			    self.model = receita;

			    self.injectModelToView(receita);
		    });
	     },

        events: {

            '{salvar} click': function () {
	            var self = this,
                    model = this.model;

                this.saveModel(this.model).ok(function (m) {

	                PI.Url.Hash.to('!Receita/Editar/' + m.Id);

                    Alert.info('Sucesso', 'Receita salva com sucesso');
                });
            },

            '{excluir} click': function(){
                var self = this;

                Confirm.show('Confirmação', 'Tem certeza que deseja excluir?', function(b){

                    if (b) {
                        self.model.excluir().ok(function(){
                           PI.Url.Hash.to('!Receita/Pesquisar'); 
                        });
                    };

                });

            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});