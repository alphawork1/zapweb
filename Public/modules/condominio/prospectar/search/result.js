yum.define([
    PI.Url.create('Condominio', '/prospectar/search/result.html'),
    // PI.Url.create('Condominio', '/prospectar/search/result.css')   
], function(html){

    Class('Condominio.Prospectar.Search.Result').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View(html);
                        
            this.rating = new UI.Rating({
                dataModel: 'Rank',
                readOnly: true
            });
        },
        
        viewDidLoad: function(){
            
            this.rating.set( this.condominio.Rank );
            
            this.base.viewDidLoad();
        },
        
        events: {
        
            '{element} click': function(){
                this.event.trigger('click', this.condominio);
            }
        }

    });

});