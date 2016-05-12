yum.define([
	PI.Url.create('UI.Popup', '/popup.html'),
	PI.Url.create('UI.Popup', '/popup.css')
], function (html) {

    var currentPopup = null;

    Class('UI.Popup').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.offsetTop = 0;
            this.offsetLeft = 0;

            this.ref = null;

            this.arrowHeight = 12;
            
            this.autoclose = true;

            this.position = 'top::left';

            this.type = 'absolute';
        },

        viewDidLoad: function(){
            this.view.element.parent().parent().css('position', 'relative');
            this.view.element.css('position', this.type);

            this.base.viewDidLoad();
        },

        getPositionRef: function(){
            return this.type == 'absolute' ? this.ref.position() : {
                top: this.ref.offset().top - $(document).scrollTop(),
                left: this.ref.offset().left
            };
        },

        getDimRef: function(){
            return {
                width: this.ref.width(),
                height: this.ref.height()
            }
        },

        getDimPopup: function(){
            return {
                width: this.view.element.width(),
                height: this.view.element.height()
            }
        },

        'top::left': function (ref) {
            var positionRef = this.getPositionRef();
            var dimPopup = this.getDimPopup();
            var dimRef = this.getDimRef();

            this.view.element.css('top',  ( positionRef.top + dimRef.height + this.arrowHeight + this.offsetTop ) + 'px')
                             .css('left', ( positionRef.left + this.offsetLeft  ) + 'px');

            this.view.topleft.show();
            this.view.leftop.hide();
            this.view.topright.hide();
            this.view.bottomright.hide();
        },

        'bottom::right': function (ref) {        
            var positionRef = this.getPositionRef();
            var dimPopup = this.getDimPopup();
            var dimRef = this.getDimRef();

            this.view.element.css('top',  ( positionRef.top - this.arrowHeight - dimPopup.height + this.offsetTop ) + 'px')
                             .css('left', ( positionRef.left - dimPopup.width + dimRef.width + this.offsetLeft ) + 'px');

            this.view.topleft.hide();
            this.view.bottomright.show();
            this.view.leftop.hide();
            this.view.topright.hide();           
        },

        'top::right': function (ref) {
            var positionRef = this.getPositionRef();
            var dimPopup = this.getDimPopup();
            var dimRef = this.getDimRef();

            this.view.element.css('top',  ( positionRef.top + dimRef.height + this.arrowHeight + this.offsetTop ) + 'px')
                             .css('left', ( positionRef.left - dimPopup.width + dimRef.width + this.offsetLeft ) + 'px');

	        this.view.topleft.hide();
            this.view.leftop.hide();
            this.view.topright.show();
            this.view.bottomright.hide();
        },

        'left::top': function (ref) {
            var positionRef = this.getPositionRef();
            var dimPopup = this.getDimPopup();
            var dimRef = this.getDimRef();

            this.view.element.css('top',  ( positionRef.top + this.offsetTop ) + 'px')
                             .css('left', ( positionRef.left + dimRef.width + this.arrowHeight + this.offsetLeft ) + 'px');

            this.view.topleft.hide();
            this.view.topright.hide();
            this.view.leftop.show();
            this.view.bottomright.hide();
        },

        'bottom::left': function (ref) {
            var positionRef = this.getPositionRef();
            var dimPopup = this.getDimPopup();
            var dimRef = this.getDimRef();

            this.view.element.css('top',  ( positionRef.top - dimPopup.height - this.arrowHeight + this.offsetTop ) + 'px')
                             .css('left', ( positionRef.left + this.offsetLeft ) + 'px');

            this.view.topleft.hide();
            this.view.topright.hide();
            this.view.leftop.hide();
            this.view.bottomright.hide();
        },

        showOnClick: function(e){
            var self = this;
            
            this.setReference(e);

            if(e instanceof Mvc.Component){                
                e.event.listen('click', function(){
                    self.show();
                });
            }else{
                e.click(function(){
                    self.show();
                });
            }
        },

        setReference: function (ref) {
	        
	        if(ref instanceof Mvc.Component){
	            this.ref = ref.view.element;
	        }else{
		        this.ref = ref;
	        }
        },

        show: function () {

            if (currentPopup != null) {
                currentPopup.hide();
            }

            currentPopup = this;

            this.view.element.show();
            this[this.position](this.ref);
        },

        toggle: function (base, ref) {
            
            if (!this.isShow) {
                this.show(base, ref);
            } else {
                this.hide();
            }
        },

        hide: function () {
            if (this.view.element != null) {
                this.isShow = false;
                this.view.element.hide();
            }
        },

        events: {

            '{window} click': function (e, ee) {
	            var id = this.ref.attr('id');
                var clss = this.ref.attr('class');
				var el = this.view.element.attr('id');

                if(!this.autoclose) return;

                if ($(ee.target).parents('#' + el).length > 0 || $(ee.target).attr('id') == el) return;

                if ($(ee.target).parents('#' + id).length == 0 && $(ee.target).parents('.' + clss).length == 0) {

                    if($(ee.target).attr('id') != id && $(ee.target).attr('class') != clss){
                        this.hide();

                        this.event.trigger('hide');                    
                    }
                    
                }
            }

        }

    });

});