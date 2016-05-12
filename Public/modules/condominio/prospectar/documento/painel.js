yum.define([
    PI.Url.create('Condominio', '/prospectar/documento/painel.html'),  
    PI.Url.create('Condominio', '/prospectar/documento/item.js')  
], function(html, itemHtml){

    Class('Condominio.Prospectar.Documento.Painel').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View(html);
            
            this.enviar = new UI.Button({
                label: 'Enviar',
                iconLeft: 'fa fa-send',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.items = [];
        },
        
        clear: function(){
            for(var i in this.items){
                this.items[i].destroy();
            }
            
            this.items = [];
            
            this.view.tv.html('');
            this.view.th.html('');
        },
        
        set: function(documentos){
            var self = this;
            
            this.clear();
            
            for(var i in documentos){
                var item = new Condominio.Prospectar.Documento.Item({
                    documento: documentos[i]
                });
                                
                if(documentos[i].Tipo == 1){
                    item.render( this.view.tv );                    
                }else{
                    item.render( this.view.th );                    
                }
                
                item.event.listen('add::document', function(documento, arquivo){
                    self.event.trigger('upload', documento, arquivo);
                });
                
                this.items.push( item );
            }            
        },
        
        findById: function(Id){
            for(var i in this.items){
                if(this.items[i].documento.Id == Id) return this.items[i].documento;
            }
        },
        
        events: {
        
            '{enviar} click': function(){
                var inputs = this.view.element.find('input:checked');
                var arr = [];
                
                for(var i = 0 ; i < inputs.length ; i++){                    
                    arr.push( parseInt( inputs[i].getAttribute('data-id') ) );
                }
                
                this.event.trigger('enviar', arr.join(','));
            },
        
            '.condominio-prospectar-documento-item click': function(e){
                var id = $(e).attr('data-id');                
                var d = this.findById( parseInt( id ) );
                                
                this.event.trigger('download', d);                
            }
        }

    });

});