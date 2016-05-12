yum.define([
	PI.Url.create('Lib', '/autocomplete/autocomplete.js')
], function (html) {

    Class('PI.Lib.Search').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div style="position: relative;"> <div at="sclink" class="autocomplete-link">  <div at="sclose" class="autocomplete-close"></div>  <a at="slink" href="#"></a></div> <div at="search" class=""></div> </div>');

            this.selected = undefined;

            this.clearOnSelect = true;

            this.placeholder = '';
            this.serviceUrl = '';
            this.paramName = 'nome';
            this.empty = '';

            this.list = [];
        },

        init: function(){
            this.search = new UI.TextBox({
                fullWidth: true,
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

                serviceUrl: this.serviceUrl,

                paramName: this.paramName,
                
                noSuggestionNotice: this.empty,

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

        select: function (item, trigger) {
            trigger = trigger == undefined ? true : trigger;

            this.selected = item;

            if (this.clearOnSelect) this.search.clear();

            this.triggeredSelect = true;

            this.view.slink.html( this.search.get() );

            this.event.trigger('select', item);
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

        set: function (item, trigger) {
            if(item == null) return;

            this.search.set( this.getValue(item) );

            this.select( item, trigger );
        },

	    events: {

            '{search} change': function(){
                this.selected = undefined;

                if( this.triggeredSelect === true){
                    this.triggeredSelect = false;
                    this.event.trigger('unselect');
                }
            },

		    '{search} enter': function(){
                var self = this;
                var value = this.search.get();
                var sel = this.list.find(function(i){
                    return self.getValue(i) == value;
                });

                if (sel != undefined) {
                    this.set( sel );
                }else if (this.list.length > 0){
                    this.set( this.list[0] );
                };
		    },

            '@sclose click': function(){
                this.view.sclink.hide();
                this.search.clear()
                this.selected = undefined;
                this.event.trigger('unselect');
            }


	    }

    });

});