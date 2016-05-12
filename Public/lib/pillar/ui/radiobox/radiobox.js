yum.define([
	
], function (html) {

    var group = [];

    Class('UI.RadioBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div><input at="__radio" type="radio" name="@{group}"></div>');
        },

        set: function (value) {
            this.view.__radio.prop('checked', value);
        },

        get: function () {
            return this.view.__radio.is(':checked') ? this.value : Mvc.Model.Type.IGNORE;
        },
        
        radioWillhange: function(cb){
            if(group[ this.group ] == undefined) group[ this.group ] = [];
            
            group[ this.group ].push( cb );
        },
        
        destroy: function(){
            delete group[ this.group ];
            
            this.base.destroy();
        },
        
        isChecked: function(){
            return this.view.__radio.is(':checked');
        },
        
        events: {
        
            '@__radio change': function(){
                var arr = group[ this.group ];
                
                for(var i in arr){
                    arr[i]();                    
                }
                
                this.event.trigger('change', this.isChecked());
            }
        }

    });

});