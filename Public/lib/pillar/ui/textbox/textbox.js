yum.define([
    PI.Url.create('UI.Textbox', '/textbox.html'),
    PI.Url.create('UI.Textbox', '/textbox.css'),
    PI.Url.create('UI.TextBox', '/mask.js')
], function (html) {

    Class('UI.TextBox').Extend(Mvc.Component).Body({
        
        instances: function () {
            this.view = new Mvc.View(html);
            this.classes = Application.getConfig('textbox.classes');
            this.textSuggest = '';
            this.MIN_TEXT_SUGGEST = 2;

            this.defaultValue = '';

            this.type = 'text';
        },

        viewDidLoad: function(){
			
            this.set(this.defaultValue);

            this.base.viewDidLoad();
        },       

        get: function () {
            return this.view.input.val();
        },

        set: function (value) {            
            this.view.input.val(value);
            this.refreshSuggest();
            this.event.trigger('change', value);
        },

        clear: function () {
            this.set('');
        },

        setPlaceholder: function (placeholder) {
            this.view.input.attr('placeholder', placeholder);
        },

        focus: function () {
            this.view.input.focus();
        },

        mask: function (tipo) {
            var self = this;

            this.event.listen('view::did::load', function () {
                if (tipo == 'financeira') {
                    self.view.input.maskMoney({ symbol: 'R$ ', allowNegative: true, showSymbol: true, thousands: '.', decimal: ',', symbolStay: true });
                } else if (tipo == 'numero') {
                    self.view.input.mask(jQuery.mask.type[tipo], { placeholder: '' });
                } else {
                    self.view.input.mask(jQuery.mask.type[tipo]);
                }
            });
            
        },

        setValidate: function (b) {
            if (b) {
                this.view.input.removeClass('ui-textbox-invalid');
            } else {
                this.view.input.addClass('ui-textbox-invalid');
            }
        },

        addSuggest: function (suggest) {
            this.textSuggest = suggest;
            this.refreshSuggest();
        },

        getSuggest: function () {
            return this.view.suggest;
        },

        refreshSuggest: function () {
            var suggest = this.textSuggest,
                text = this.get();

            if (text === suggest || suggest.length == 0 || text.length < this.MIN_TEXT_SUGGEST || PI.String.removeAcentos(suggest.substr(0, text.length).toLowerCase()).match(PI.String.removeAcentos(text).toLowerCase()) == null) {
                this.view.suggest.val('');
                return false;
            }

            this.view.suggest.val(
                suggest.replace(
                    suggest.substr(0, text.length),
                    text
                )
            );
        },

        setEnable: function (b) {
            if (b) {
                this.view.input.attr('disabled', false);
            } else {
                this.view.input.attr('disabled', true);
            }
        },

        events: {
            
            '@input focus': function () {
                this.event.trigger('focus');                
            },

            '@input focusout': function () {
                this.event.trigger('lostfocus');
            },

            '@input keydown': function (e, ee) {
                var self = this;

                if (ee.keyCode == PI.KEYBOARD.TAB) {

                    //if (this.textSuggest.length > 0 && this.get().length > this.MIN_TEXT_SUGGEST - 1) {
                    //    this.set(this.textSuggest);
                    //    ee.preventDefault();
                    //    return false;
                    //}

                    //var b = this.event.trigger('tab');
                    //if (b === true || b === false) return b;
                    this.event.trigger('lostfocus');
                }

                if (ee.keyCode == PI.KEYBOARD.BACKSPACE) {
                    var b = this.event.trigger('backspace');
                    if (b === true || b === false) return b;
                }

                self.event.trigger('keydown', ee);

                setTimeout(function () {

                    if (self.get().length == 0) {
                        self.addSuggest('');
                    }

                    if (PI.String.isAlphaNumeric(ee) || ee.keyCode == 96 || ee.keyCode == 8) {
                        self.event.trigger('change', self.get(), ee);
                    }

                }, 2);
            },

            '@input keyup': function (e, ee) {

                if (ee.keyCode == PI.KEYBOARD.ENTER) {
                    var b = this.event.trigger('enter');
                    if (b === true || b === false) return b;
                }

                if (ee.keyCode == PI.KEYBOARD.SPACE) {
                    var b = this.event.trigger('space');
                    if (b === true || b === false) return b;
                }

                this.event.trigger('keyup', ee);
                this.refreshSuggest();
            },

            '@input change': function (e, ee) {
                this.event.trigger('change', this.get(), ee);
            }

        }

    });

});