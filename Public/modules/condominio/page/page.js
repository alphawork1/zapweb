yum.define([
	PI.Url.create('Condominio', '/page/page.html'),
	PI.Url.create('Condominio', '/page/impressao.html'),
	PI.Url.create('Condominio', '/page/page.css'),
	PI.Url.create('Condominio', '/historico/painel.js'),
	PI.Url.create('Condominio', '/campanha/painel.js'),
	PI.Url.create('Condominio', '/status/select.js'),
    
    PI.Url.create('Administradora', '/textbox/textbox.js'),
    
    PI.Url.create('Lib', '/rating/rating.js')
], function (html, impressaoHtml) {

    Class('Condominio.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.tabbar = new UI.TabBar({
                container: this.view
            });
            
            // campos novos
            
             this.emailCondominio = new UI.TextBox({
                placeholder: 'Informe o email do condomínio',
                dataModel: ''
            });
            
            this.disposicaoApPorAndar = new UI.TextArea({
				placeholder: 'Informe a disposição de apartamentos',
				autosize: false,
                height: '105px'
			});
            
            this.avalicaoCadastrador = new UI.TextArea({
				placeholder: 'Por quê da avaliação',
				autosize: false,
                height: '105px'
			});

            // fim campos novo
            
            this.dataCadastro = new UI.DateBox({
                placeholder: 'Data do Cadastro',
                dataModel: 'DataCadastro'
            });

            this.nome = new UI.TextBox({
                placeholder: 'Nome',
                dataModel: 'Nome'
            });

            this.cadastrador = new Usuario.Search.TextBox({
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
                label: 'Síndico',
                dataModel: 'Sindico'
            });

            this.zelador = new Contato.Painel({
                label: 'Zelador',
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

            this.notaAparencia = new UI.Select({
                items: ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                defaultValue: '',
                dataModel: 'NotaAparencia'
            });

            this.classeSocial = new UI.Select({
                items: ['', 'A', 'B', 'C'],
                defaultValue: '',
                dataModel: 'ClasseSocial'
            });

            this.notaCadastrador = new UI.Select({
                items: ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                defaultValue: '',
                dataModel: 'NotaCadastrador'
            });
            
            this.telefonePortaria = new UI.TextBox({
                placeholder: '(00) 0000-0000',
                dataModel: 'TelefonePortaria'
            });
                        
			this.observacao = new UI.RichText({
				dataModel: 'Observacao',
				placeholder: 'Informe uma observação',
				autosize: true
			});
            
            this.referencia = new UI.SelectionBox({
                dataModel: function(model, method, value){
                    if(method == 'get'){
                        this.referencia.set(function(item){
                            return item.id === model.IsReferencia;                            
                        });
                    }else{
                        model.IsReferencia = +value;
                    }
                },
                dataModelProperty: 'id',
                label: 'Selecione',
            });

            this.rating = new UI.Rating({
                dataModel: 'Rank',
                readOnly: true
            });

            this.contatos = new Condominio.Historico.Painel();
            this.campanhas = new Condominio.Campanha.Painel();

            this.imprimir = new UI.Button({
                label: 'Imprimir',
                classes: 'cinza',
                iconLeft: 'fa fa-print',
                style: {
                    'min-width': '120px'
                }
            });

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

            this.referencia.add( new UI.Selection.Item({id: false, label: 'Não'}) );                        
            this.referencia.add( new UI.Selection.Item({id: true, label: 'Sim'}) );                        

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
            },
            
            '{imprimir} click': function(){
                this.view.printContent.html( Mvc.Helpers.tpl({}, impressaoHtml));
                window.print();
            },

        }

    });

});