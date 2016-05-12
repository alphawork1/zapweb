yum.define([
    PI.Url.create('Condominio', '/prospectar/page.html'),
    PI.Url.create('Condominio', '/prospectar/page.css'),
    
    PI.Url.create('Condominio', '/prospectar/search/search.js'),
    PI.Url.create('Condominio', '/prospectar/contato/painel.js'),
    PI.Url.create('Condominio', '/prospectar/documento/painel.js'),    
    PI.Url.create('Condominio', '/prospectar/email/modal.js'),
    
    PI.Url.create('Condominio', '/historico/modaladd.js'),
    
    PI.Url.create('Variavel', '/painel/painel.js')
], function(html) {

    Class('Condominio.Prospectar.Page').Extend(PI.Page).Body({

        instances: function() {
            this.view = new Mvc.View(html);

            this.status = new Condominio.Status.Select({
                dataModel: 'Status',
                transparent: true,
                showArrow: false
            });

            this.pesquisa = new Condominio.Prospecto.Search();

            this.title = 'Pesquisa Prospecto';

            this.contato = new Condominio.Prospectar.Contato.Painel();

            this.variavel = new Variavel.Painel();
            
            this.documentos = new Condominio.Prospectar.Documento.Painel();

            this.rating = new UI.Rating({                
                dataModel: 'Rank'
            });
            
            this.observacao = new UI.RichText({
                dataModel: 'Observacao',
                placeholder: 'Informe uma observação',
                autosize: true
            });
                        
            this.pesquisar = new UI.Button({
                label: 'Pesquisar',
                iconLeft: 'fa fa-search',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.historicos = new UI.Button({
                label: 'Históricos',
                iconLeft: 'fa fa-navicon',
                classes: 'cinza',
                style: {
                    'min-width': '120px'                    
                }
            });
            
            this.addContato = new UI.Button({
                label: 'Contato',
                iconLeft: 'fa fa-plus',
                classes: 'cinza',
                style: {
                    'min-width': '120px'                    
                }
            });
            
            this.voltar = new UI.Button();
            
            this.model = new Condominio.Model();
        },

        viewDidLoad: function() {                        
            this.base.viewDidLoad();
            
            this.pesquisa.open();
        },
        
        expand: function(){
            this.view.body.css('left', '-90px');
            this.view.find('coptions').css('margin-left', '20px');            
        },
        
        contract: function(){
            this.view.body.css('left', '0px');            
            this.view.find('coptions').css('margin-left', '70px');
        },

        events: {

            '{pesquisar} click': function(){
                this.pesquisa.open();
            },
            
            '{pesquisa} open': function(){
                this.expand();
            },
            
            '{pesquisa} close': function(){
                this.contract();
            },
            
            '{pesquisa} select': function(condominio){
                var self = this;
                
                this.model.get( condominio.Id ).ok(function(condominio){
                    self.model = condominio;
                    self.injectModelToView( condominio );
                    
                    self.contato.set(condominio);
                    self.variavel.set( condominio.Variaveis );
                    self.documentos.set( condominio.Documentos );
                    
                    self.view.linkEditar.attr('href', condominio.getUrl());
                });
            },
            
            '{variavel.salvar} click': function(){
                this.model.Variaveis = this.variavel.get();
                
                this.model.updateVariaveis();
            },
            
            '{documentos} download': function(documento){
                this.model.downloadDocumento( this.model.Id, documento.ArquivoId, documento.Nome);
            },
            
            '{documentos} upload': function(documento, arquivo){
                this.model.addDocumento( this.model.Id, documento.Id, arquivo.Id);
            },
            
            '{documentos} enviar': function(arquivoIds){
                if(arquivoIds.length == 0){
                    Alert.error('Aviso', 'Selecione os arquivos a serem enviados');
                    return;
                }
                
                var self = this;
                var modal = new Condominio.Prospectar.Email.Modal({
                    condominio: this.model
                });
                
                modal.render( this.view.body );
                
                modal.open();
                
                modal.event.listen('enviar', function(assunto, mensagem, emails){
                    modal.close();
                    self.model.enviarDocumento(self.model.Id, assunto, mensagem, arquivoIds, emails);                    
                });                                    
            },
            
            '{rating} click': function(rank){
                this.model.Rank = rank;
                
                this.model.updateRank();
            },
            
            '{status} change': function(status){
                this.model.Status = status;
                
                this.model.updateStatus();
            },
            
            '{historicos} click': function(){                
                var modal = new Condominio.Historico.Modal({
                    isShowAdd: false,
                    model: new Condominio.Historico.Model({
                        Condominio: this.model
                    })
                });
                
                modal.render( this.view.body );
                
                modal.open();
                
            },
            
            '{addContato} click': function(){
                var modal = new Condominio.Historico.ModalAdd({                 
                    model: new Condominio.Historico.Model({
                        Condominio: this.model
                    })
                });
                
                modal.render( this.view.body );
                
                modal.open();                
            },

        }


    });

});