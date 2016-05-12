yum.define([
	PI.Url.create('Condominio', '/page/page.html'),
	PI.Url.create('Condominio', '/page/page.css'),
	PI.Url.create('Condominio', '/historico/painel.js'),
	PI.Url.create('Condominio', '/campanha/painel.js'),
	PI.Url.create('Condominio', '/status/select.js'),
    
    PI.Url.create('Administradora', '/textbox/textbox.js'),
    
    PI.Url.create('Lib', '/rating/rating.js')
], function (html) {

    Class('Condominio.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.tabbar = new UI.TabBar({
                container: this.view
            });

            this.dataCadastro = new UI.DateBox({
                placeholder: 'Data do Cadastro',
                dataModel: 'DataCadastro'
            });

            this.nome = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Nome'
            });

            this.cadastrador = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Cadastrador'
            });

            this.colaborador = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Colaborador'
            });

            this.qtdeApto = new UI.TextBox({
                placeholder: 'Número',
                mask: 'numero',
                dataModel: 'QuantidadeApto'
            });

            this.qtdeBlocos = new UI.TextBox({
                placeholder: 'Número',
                mask: 'numero',
                dataModel: 'QuantidadeBlocos'
            });

            this.andaresBloco = new UI.TextBox({
                placeholder: 'Andares',
                mask: 'numero',
                dataModel: 'QuantidadeAndaresBloco'
            });

            this.administradora = new Administradora.TextBox({
                dataModel: 'Administradora'
            });

            this.sindico = new Contato.Painel({
                dataModel: 'Sindico'
            });

            this.zelador = new Contato.Painel({
                dataModel: 'Zelador'
            });

            //endereco
            this.endereco = new Endereco.Painel({
                dataModel: 'Endereco'
            });
            
            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.telefone = new Telefone.Painel({
                dataModel: 'Telefones'
            });
            
            this.dataUltimaCampanha = new UI.DateBox({
				placeholder: 'Data',
                dataModel: 'DataUltimaCampanha'
            });
            
            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false,
                dataModel: 'Unidade'
            });

			this.observacao = new UI.RichText({
				dataModel: 'Observacao',
				placeholder: 'Informe uma observação',
				autosize: true
			});

            this.rating = new UI.Rating({
                dataModel: 'Rank',
                readOnly: true
            });

            this.contatos = new Condominio.Historico.Painel();
            this.campanhas = new Condominio.Campanha.Painel();

            this.salvar = new UI.Button({
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
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
            
            this.title = 'Condomínio';
        },

        viewDidLoad: function () {
            var self = this;
            
            this.tabbar.add('geral', 'Dados Gerais', true);
            this.tabbar.add('contatos', 'Contatos');
            this.tabbar.add('campanhas', 'Campanhas');
            
            
            if(this.model.isNew()){               
                app.home.setTitle('Adicionar Condomínio');
                
                this.unidade.set(Unidade.Current);
                
                this.tabbar.hideTab('contatos');
                this.tabbar.hideTab('campanhas');
                
            }else{
                app.home.setTitle('Editar Condomínio');
                
                this.contatos.load( this.model );
                this.campanhas.load( this.model );
                
                this.model.get().ok(function(model){
                    self.model = model;
                    
					self.breadcumb.setTitle('Condomínio ' + model.Nome);

                    self.injectModelToView( model );
                }).error(function (message) {
                    Alert.error('Não foi possível', message);
                });
            }          
            
            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {                                
                
                this.saveModel( this.model ).ok(function (model) {
                    PI.Url.Hash.to('!Condominio/Editar/' + model.Id);
                    Alert.info('Sucesso', 'Condomínio salvo com sucesso!');                    
                });
            },

            '{voltar} click': function () {
                window.history.back();
            },
            
            '{contatos} added': function(contato){
                this.rating.set( contato.Rank );
            }

        }

    });

});