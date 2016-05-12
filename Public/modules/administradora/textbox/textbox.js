yum.define([
	PI.Url.create('Lib', '/autocomplete/search.js'),

    PI.Url.create('Administradora', '/model.js')
], function(html){
	
	Class('Administradora.TextBox').Extend(PI.Lib.Search).Body({
	
		instances: function () {
            this.placeholder = 'Informe a administradora';
            this.serviceUrl = Application.getConfig('model.url') + '/Administradora/SearchByNome';
            this.paramName = 'nome';
            this.empty = '<b>Administradora não encontrado</b>. <br/> <a at="linkAdd" href="#Administradora/Adicionar?returnPage=true">Adicionar Administradora</a>';

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

                this.view.find('linkAdd').attr('href', '#Administradora/Adicionar?returnPage=true&nome=' + text);
            },

            '{this} select': function(){
                this.view.sclink.show();
                this.view.slink.attr('href', '#Administradora/Editar/' + this.selected.Id );
            },

            '{EventGlobal} administradora::save': function(administradora){
                this.set( administradora );
            }
        
        }

	});
	
});