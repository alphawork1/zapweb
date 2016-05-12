yum.define([
    PI.Url.create('UI.Tag', '/tag.css'),
    PI.Url.create('UI.TextBox', '/textbox.js')
], function () {

    Class('UI.Tag').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div class="ui-tag"> <div at="textbox" class="textbox"></div> </div>');

            this.textbox = new UI.TextBox();
            
            this.backEditing = true;

            this._min = 30;
            this._allowAddTag = true;
            this._Convert2Tags = function (tags) {
                return tags.split(' ');
            };
            this._convert2Array = PI.Function.cb;
        },

        viewDidLoad: function () {
            this.textbox.setPlaceholder(this.placeholder);

            this.ajusteView();

            this.textbox.focus();

            this.base.viewDidLoad();
        },

        get: function () {
            var tags = this.getTags(),
                text = this.textbox.get();

            if (text.replace(/\s+/gi, '').length > 0) {
                var p = text.split(' ');

                for (var i = 0; i < p.length; i++) {
                    if (p[i].length == 0) continue;
                    tags.push(p[i]);
                }

            }

            if (PI.Type.isFunction(this._convert2Array)) {
                tags = this._convert2Array(tags);
            }

            return tags;
		},
		
        set: function (tags) {

            if (PI.Type.isFunction(this._Convert2Tags)) {
                tags = this._Convert2Tags(tags);
            }

            this.textbox.set(tags[tags.length - 1]);

            for (var i = 0 ; i < tags.length - 1; i++) {
                var v = tags[i];

                if (v.length == 0) continue;

                this.createTag(v);
            }
		},

        modelToTag: function (c) {
		    this._Convert2Tags = c;
		},

        tagToModel: function (c) {
            this._convert2Array = c;
		},

        min: function (m) {
            if (m > 0) {
                this._min = m;
            }
        },

        width: function (w) {
            var n = PI.Lib.Convert.Pixel2Number(w);
            this.textbox.view.element.width(n - 30);
            this.base.width(n + 10);
        },

        getTags: function () {            
            var arr = [];
            
            this.view.element.find('.tag').each(function (a, e) {
                arr.push(PI.String.trim(e.getAttribute('value')));
            });

            return arr;
        },

        ajusteView: function () {
            this.textbox.view.element.width(20);

            var wd = this.view.element.width(),
                le = this.textbox.view.element.position().left,
                tw = wd - le - 30;
            
            if (tw > this._min) {
                this.textbox.view.element.width(tw);
            } else {
                this.textbox.view.element.width(this._min);
            }
        },

        createTag: function (texto) {

            if (texto.replace(/\s*/gi, '').length == 0) return;

            var tpl = Mvc.Helpers.tpl({ texto: texto }, '<div class="tag" value="@{texto}">@{texto}<i at="close" class="arrow-right fa fa-caret-right"></i></div>');
            this.view.textbox.before(tpl);

            this.ajusteView();

            this.event.trigger('change', this.get());
        },

        removeTag: function (texto) {
            var el = this.view.element.find('[value="' + texto + '"]');
            if (el != undefined) {
                this.removeTagByEl(el);
                this.ajusteView();
            }
        },

        removeTagByEl: function (tag) {
            tag.remove();

            this.event.trigger('change', this.get());
            this.ajusteView();
        },

        allowAddTag: function (b) {
            this._allowAddTag = b;
        },

        newTag: function () {
            if (!this._allowAddTag) return;

            var v = this.textbox.get();

            if (v.length > 0) {
                this.createTag(v);
                this.ajusteView();
                this.textbox.set('');
            }

            return this;
        },

        events: {            

            '{textbox} enter': function () {
                this.event.trigger('enter');

                if (!this.backEditing) return;

                this.newTag();
            },

            '{textbox} space': function () {
                if (!this.backEditing) return;

                this.newTag();
            },

            '{textbox} backspace': function (el, e) {
                if (!this.backEditing) return;

                var self = this;
                var v = this.textbox.get();

                if (v.length == 0) {
                    var t = this.view.element.find(".tag").last();

                    v = t.attr('value');

                    this.removeTagByEl(t);
                    
                    this.event.trigger('remove', t.attr('value'));
                    
                    setTimeout(function () {
                        self.textbox.set(v);
                    }, 10);
                    
                }                
            },

            '{textbox} focus': function () {
                this.view.element.addClass('focus');
                this.event.trigger('focus');
            },

            '{textbox} lostfocus': function () {
                this.view.element.removeClass('focus');
                this.event.trigger('lostfocus');

                if (!this.backEditing) return;

                this.newTag();
            },

            '{element} click': function () {
                this.textbox.focus();
            },

            '@close click': function (el) {
                var t = el.parent();
                this.removeTagByEl(t);
                this.event.trigger('remove', t.attr('value'));
            }
        }

    });

});