yum.define([
    
], function () {

    Class('Telefone.Tipo').Static({
        RESIDENCIAL : 1,
        COMERCIAL   : 2,
        CELULAR     : 3,
        FAX         : 4,
        WHATSAPP    : 5,
        CONDOMINIO  : 6,
        
        toNome: function(id){
            switch (id) {
                case Telefone.Tipo.RESIDENCIAL: return 'Fixo';                    
                case Telefone.Tipo.COMERCIAL: return 'Comercial';                    
                case Telefone.Tipo.CELULAR: return 'Celular';                    
                case Telefone.Tipo.FAX: return 'Fax';                    
                case Telefone.Tipo.WHATSAPP: return 'Whatsapp';                    
                case Telefone.Tipo.CONDOMINIO: return 'Condomínio';                  
            }
        },
        
        toCss: function(id){
            switch (id) {
                case Telefone.Tipo.RESIDENCIAL: return 'bg-primary';                    
                case Telefone.Tipo.COMERCIAL: return 'bg-warning';                    
                case Telefone.Tipo.CELULAR: return 'bg-danger';                    
                case Telefone.Tipo.FAX: return 'bg-info';                    
                case Telefone.Tipo.WHATSAPP: return 'bg-success';                    
                case Telefone.Tipo.CONDOMINIO: return 'bg-primary';                  
            }
        },
    });

    Class('Telefone.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {

        },

        init: function () {
            this.base.init('/Telefone');
        },

        validations: function () {
            return {
                //'': new Mvc.Model.Validator.Required('')
            };
        },

        initWithJson: function (json) {
            var model = new Telefone.Model(json);

            return model;
        },
        
        getTipoLabel: function(){
            return Telefone.Tipo.toNome( this.Tipo );
        },
        
        getCssLabel: function(){
            return Telefone.Tipo.toCss( this.Tipo );
        },

        actions: {
            
        }

    });
});