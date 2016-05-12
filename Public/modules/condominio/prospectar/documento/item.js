yum.define([
    PI.Url.create('Condominio', '/prospectar/documento/item.html')    
], function(html){

    Class('Condominio.Prospectar.Documento.Item').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View(html);
            
            this.upload = new UI.Upload({
                label: '',
                baseUrl: Application.getConfig('model.url') + '/arquivo',
                classes: 'btn btn-sm button cinza',
                config: {
                    extensions: ['docx', 'doc'],
                    unidade: 'Kilobytes',
                    maxSize: 5242880 // 5MB
                },
                style: {
                    width: '50px'
                }
            });                        
        },
        
        viewDidLoad: function(){            
            this.setArquivoId( this.documento.ArquivoId );

            this.base.viewDidLoad();
        },
        
        setArquivoId: function(id){
            this.view.link.attr('href', Application.getConfig('model.url') + '/Arquivo/DownloadById?arquivoId=' + id);
            this.view.input.attr('data-id', id);
            this.view.link.attr('data-id', id);
        },
        
        events: {
        
            '{upload} success': function (arquivo) {
                this.setArquivoId( arquivo.Id );
                this.event.trigger('add::document', this.documento, arquivo);
            },

            '{upload} error': function (message) {
                Alert.error('Não foi possível enviar o documento', message);
            }
        }

    });

});