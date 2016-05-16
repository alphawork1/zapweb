yum.define([
    PI.Url.create('Condominio', '/prospectar/contato/painel.html'),
    // PI.Url.create('Condominio', '/prospectar/contato/painel.css')
], function(html){

    Class('Condominio.Prospectar.Contato.Painel').Extend(Mvc.Component).Body({

        instances: function(){
            this.view = new Mvc.View(html);
        },
        
        set: function(condominio){            
            var view = '';
            
            if(condominio.Sindico.Telefones != undefined && condominio.Sindico.Telefones.length > 0){
                view += Mvc.Helpers.tpl(condominio, '<tr><td style="text-align: left" ><b>Síndico</b><td>@{this.Sindico.Nome}</td><td>@{this.Sindico.Email}</td><td>' + this.getViewTelefones(condominio.Sindico.Telefones) + '</td></tr>');                
            }
            
            if(condominio.Zelador.Telefones != undefined && condominio.Zelador.Telefones.length > 0){
                view += Mvc.Helpers.tpl(condominio, '<tr><td style="text-align: left" ><b>Zelador</b><td>@{this.Zelador.Nome}</td><td>@{this.Sindico.Email}</td><td>' + this.getViewTelefones(condominio.Zelador.Telefones) + '</td></tr>');                
            }
            
            if(condominio.Administradora.Telefones != undefined && condominio.Administradora.Telefones.length > 0){
                view += Mvc.Helpers.tpl(condominio, '<tr><td style="text-align: left" ><b>Administradora</b><td>@{this.Administradora.Nome}</td><td>@{this.Administradora.Email}</td><td>' + this.getViewTelefones(condominio.Administradora.Telefones) + '</td></tr>');                
            }
            
            this.view.tbody.html( view );
        },
        
        getViewTelefones: function(telefones){
            var view = '';
            
            if(telefones == undefined) return view;
            
            for (var i = 0; i < telefones.length; i++) {
                view += Mvc.Helpers.tpl(telefones[i], '<a href="skype:@{Numero}?call"><span style="min-width: 62px;display: inline-block;padding: 3px;" class="label @{this.getCssLabel()}">@{this.getTipoLabel()}</span> @{Numero}</a>') + '<br>';    
            }
            
            return view;
            
        },

    });

});