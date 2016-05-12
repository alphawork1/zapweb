yum.define([
	PI.Url.create('Lib', '/autocomplete/search.js'),

    PI.Url.create('Sindico', '/model.js')
], function(html){
	
	Class('Sindico.TextBox').Extend(PI.Lib.Search).Body({
	
		instances: function () {
            this.placeholder = 'Informe o nome do Síndico';
            this.serviceUrl = '/Sindico/SearchByNome';
            this.paramName = 'nome';
            this.empty = '<b>Sindico não encontrado</b>. <br/> <a at="linkAddSindico" href="#Sindico/Adicionar?returnPage=true">Adicionar Síndico</a>';

            this.clearOnSelect = false;
        },

        getModel: function(json){
            return json;
        },

        getValue: function(json){
            if (json == undefined) return '';

			return json.Nome;
        },

        events: {
            
            'input keyup': function(){
                var text = this.view.find('input').val();

                this.view.find('linkAddSindico').attr('href', '#Sindico/Adicionar?returnPage=true&nome=' + text);
            },

            '{this} select': function(){
                this.view.sclink.show();
                this.view.slink.attr('href', '#Sindico/Editar/' + this.selected.Id );
            },

            '{EventGlobal} sindico::save': function(sindico){
                this.set( sindico );
            }
        
        }

	});
	
});