yum.define([
    // PI.Url.create('Condominio', '/status/select.html'),
    // PI.Url.create('Condominio', '/status/select.css')
], function(html){

    Class('Condominio.Status.Select').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View('<div> <div at="select"></div> </div>');            
        },
        
        init: function(){
            this.select = new UI.SelectionBox({
                label: 'Selecione',
                transparent: this.transparent,
                showArrow: this.showArrow
            });           
        },
        
        viewDidLoad: function(){
            
            // this.select.add(new UI.Selection.Separador());
            this.select.add(new UI.Selection.Item({ id: Condominio.Status.ARQUIVADO, label: 'Arquivar', showMenu: false }));
            this.select.add(new UI.Selection.Item({ id: Condominio.Status.CLIENTE, label: 'Tornar Cliente', showMenu: false }));
            this.select.add(new UI.Selection.Item({ id: Condominio.Status.EM_NEGOCIACAO, label: 'Em negociação', showMenu: false }));
            
            this.base.viewDidLoad();
        },
        
        set: function(id){
            this.select.set(function(item){
                return item.id == id;
            });
        },
        
        get: function(){
            return this.select.get(); 
        },
        
        events: {
        
            '{select} change': function(item){
                this.event.trigger('change', item.id);
            }
        }

    });

});