yum.define([
	PI.Url.create('Lib.AutoComplete', '/autocomplete.js')
], function (html) {

    Class('Util.Search.TextBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div> <div at="search" class=""></div> </div>');

            this.selected = undefined;

            this.clearOnSelect = true;

            this.placeholder = '';
            this.serviceUrl = '';
            this.paramName = 'nome';

            this.list = [];
        },

        init: function(){
            this.search = new UI.TextBox({
                placeholder: this.placeholder,
                classes: ''
            });
        },

        getModel: function(json){
            return {};
        },

        getValue: function(json){
            return json.Nome;
        },

        viewDidLoad: function () {
            var self = this;

            this.search.view.input.autocomplete({
                appendTo: this.view.element,

                serviceUrl: Application.getConfig('model.url') + this.serviceUrl,

                paramName: this.paramName,

                transformResult: function (response) {
                    response = JSON.parse(response);

                    self.selected = undefined;
                    self.list = [];

                    return {
                        suggestions: $.map(response.data, function (dataItem) {
                            var model = self.getModel(dataItem);

                            self.list.push(model);

                            return { value: self.getValue(model), model: model };
                        })
                    };
                },

                onSelect: function (suggestion) {
                    self.select(suggestion.model);
                }
            });

            this.base.viewDidLoad();
        },

        select: function (unidade) {
            this.selected = unidade;

            if (this.clearOnSelect) this.search.clear();

            this.event.trigger('select', unidade);
        },

        setValidate: function (b) {
            this.search.setValidate(b);
        },

        get: function () {
            return this.selected;
        },

        destroy: function () {
            this.search.view.input.autocomplete('dispose');
            this.base.destroy();
        },

        set: function (unidade) {
            if(unidade == null) return;

            this.selected = unidade;

            this.search.set( this.getValue(unidade) );
        },

	    events: {

            '{search} change': function(){

                if (this.search.get().length == 0) {
                    this.selected = undefined;
                };
            },

		    '{search} enter': function(){

               if (this.list.length > 0){
                    this.set( this.list[0] );
               };
		    }

	    }

    });

});