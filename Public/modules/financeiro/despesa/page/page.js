yum.define([
	PI.Url.create('Financeiro', '/despesa/page/page.html'),
	PI.Url.create('Financeiro', '/despesa/page/page.css'),
    PI.Url.create('Financeiro', '/centrocusto/select/select.js'),
    PI.Url.create('Fornecedor', '/search/textbox.js'),
    PI.Url.create('Financeiro', '/item/table.js'),
    PI.Url.create('Financeiro', '/despesa/model.js'),
    PI.Url.create('Arquivo', '/painel.js'),
    PI.Url.create('Historico', '/painel.js'),
    PI.Url.create('Financeiro', '/despesa/justificativa/modal.js')
], function (html) {

    Class('Financeiro.Despesa.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.data = new UI.DateBox({
                placeholder: 'Data',
                dataModel: 'Data'
            });

            this.numero = new UI.TextBox({
                placeholder: 'Número',
                dataModel: 'Numero'
            });

            this.status = new UI.TextBox({
                placeholder: 'Aberta',
                dataModel: function (model, method) {
                    if (method == 'get') return model.getStatus();
                }
            });

            this.fornecedor = new Fornecedor.Search.TextBox({
                clearOnSelect: false,
                placeholder: 'Fornecedor',
                dataModel: 'Fornecedor'
            });

            this.unidade = new Unidade.Search.TextBox({
                clearOnSelect: false,
                dataModel: 'Unidade'
            });

            this.usuario = new Usuario.Search.TextBox({
                clearOnSelect: false,
                placeholder: 'Usuário',
                dataModel: 'Usuario'
            });

            this.table = new Financeiro.Item.Table({
                dataModel: 'Items'
            });

            this.anexo = new Arquivo.Painel({
                dataModel: 'Anexos'
            });

            this.historico = new Historico.Painel({
                dataModel: 'Historicos'
            });

            this.salvar = new UI.Button({                
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.remover = new UI.Button({                
                label: 'Excluir',
                iconLeft: 'fa fa-times',
                classes: 'vermelho',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.remeter = new UI.Button({
                label: 'Remeter',
                iconLeft: 'fa fa-send',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.pagar = new UI.Button({
                label: 'Pagar',
                iconLeft: 'fa fa-thumbs-o-up',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.naopagar = new UI.Button({
                label: 'Não Pagar',
                iconLeft: 'fa fa-thumbs-o-down',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.autorizar = new UI.Button({
                label: 'Autorizar',
                iconLeft: 'fa fa-thumbs-o-up',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.naoautorizar = new UI.Button({
                label: 'Não Autorizar',
                iconLeft: 'fa fa-thumbs-o-down',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'text-align': 'left',
                    'min-width': '133px'
                }
            });
            
            this.title = 'Despesa';
        },

        viewDidLoad: function () {
            var self = this;

            this.status.setEnable(false);

            this.remover.hide();

            if (this.model.isNotNew()) {
                app.home.setTitle('Editar Despesa');

                if(Usuario.Current.Unidade.Tipo == Unidade.Tipo.ZAP){
                    this.remover.show();                
                }
                
                this.model.get().ok(function (model) {
                    self.model = model;

                    self.chooseButton(self.model);

                    self.injectModelToView(self.model);
                }).error(function (message) {
                    Alert.error('Não foi possível', message);
                });

                app.home.setTitle('Editar Despesa');

            } else {
                app.home.setTitle('Adicionar Despesa');

                this.unidade.set(Unidade.Current);
                this.usuario.set(Usuario.Current);
            }

            this.base.viewDidLoad();
        },

        chooseButton: function (despesa) {
            this.view.remeter.hide();

            this.view.pagar.hide();
            this.view.naopagar.hide();

            this.view.autorizar.hide();
            this.view.naoautorizar.hide();

            if (despesa.Status == Financeiro.Despesa.Status.AUTORIZADA) {
                return;
            }else if (Usuario.Current.Unidade.Tipo == Unidade.Tipo.ZAP) {
                this.view.autorizar.show();
                this.view.naoautorizar.show();
            }else if (Usuario.Current.Unidade.Id == despesa.Unidade.getUnidadeIdPai() && despesa.Status == Financeiro.Despesa.Status.REMETIDA) {
                this.view.pagar.show();
                this.view.naopagar.show();
            } else if (despesa.Status == Financeiro.Despesa.Status.ABERTA) {
                this.view.remeter.show();
            }

            if (despesa.Status == Financeiro.Despesa.Status.NAO_PAGA) {
                this.view.remeter.show();
            }

            if (despesa.Status == Financeiro.Despesa.Status.NAO_AUTORIZADA) {
                this.view.pagar.show();
                this.view.naopagar.show();
            }

        },  

        events: {

            '{salvar} click': function () {
                var self = this;

                this.saveModel(this.model).ok(function (m) {
                    
                    Alert.info('Sucesso', 'Despesa salva com sucesso', function(){

                        PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
    
                    });

                    self.historico.set(m.Historicos);
                });
            },

            '{remover} click': function(){
                var self = this;  

                Confirm.show('Atenção', 'Tem certeza que deseja excluir?<br/>Esta operação não poderá ser desfeita', function(b){
                    
                    if (b) {
                        self.remover.setLabel('Excluindo ...').lock();
                        self.model.excluir().ok(function(){
                            
                            window.location = PI.Url.create('BaseUrl', '/').getUrl();

                        }).error(function(message){
                            Alert.show('Não foi possível', message);
                            self.remover.setLabel('Excluir').unlock();
                        });
                    };

                });
            },

            '{remeter} click': function () {
                
                this.saveModel(this.model, 'remeter').ok(function (m) {
                
                    Alert.info('Sucesso', 'Despesa remetida para análise', function(){

                        PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
    
                    });

                });
            },

            '{pagar} click': function () {
                
                this.saveModel(this.model, 'pagar').ok(function (m) {
                    
                    Alert.info('Sucesso', 'Despesa paga', function(){

                        PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
    
                    });
                });
            },

            '{naopagar} click': function () {
                var self = this;
                var modal = new Financeiro.Despesa.Justificativa.Modal();

                modal.render( this.view.element );
                modal.open();

                modal.event.listen('save', function(justificativa){
                    self.model.Justificativa = justificativa;

                    self.saveModel(self.model, 'naopagar').ok(function (m) {

                        Alert.info('Sucesso', 'Despesa não paga', function(){

                            PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
        
                        });

                    });
                });
                
            },

            '{autorizar} click': function () {

                this.saveModel(this.model, 'autorizar').ok(function (m) {
                    
                    Alert.info('Sucesso', 'Despesa autorizada', function(){

                        PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
    
                    });
                });
            },

            '{naoautorizar} click': function () {
                var self = this;

                var modal = new Financeiro.Despesa.Justificativa.Modal();

                modal.render( this.view.element );
                modal.open();

                modal.event.listen('save', function(justificativa){
                    self.model.Justificativa = justificativa;

                    self.saveModel(self.model, 'naoautorizar').ok(function (m) {

                        Alert.info('Sucesso', 'Despesa não autorizada', function(){

                            PI.Url.Hash.to('!Despesa/Editar/' + m.Id);
        
                        });

                    });
                });

            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});