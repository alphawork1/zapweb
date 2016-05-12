yum.define([
    PI.Url.create('UI.AutoComplete', '/autocomplete.html'),
    PI.Url.create('UI.AutoComplete', '/autocomplete.css'),
    PI.Url.create('UI.MarkText', '/marktext.js')
], function (html) {

    Class('UI.AutoComplete').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.lastLetterSearched = '';
            this.itemSelected = null;

            this.itemsCached = [];
            this.searchCached = [];
            this.items = [];

            this.searching = false;

            this.textbox = new UI.TextBox();
            this.list = new UI.List();

            this.filter = function (text) {
                return text;
            };
        },

        viewDidLoad: function () {
            
            this.textbox.setPlaceholder(this.placeholder || '');

            this.list.setViewParent(this.view);

            this.base.viewDidLoad();
        },

        preencheList: function (items) {

            this.list.clear();

            if (items.length > 0) {
                var count = 0;

                for (var i in items) {
                    count++;

                    if (count > 15) break;
                    var item = new UI.ListItem(items[i]);

                    this.list.add(item);
                    item.component = item;

                }
                this.view.hint.show();
            } else {
                this.view.hint.hide();
            }

            if (items.length > 0) this.textbox.addSuggest(items[0].label);
        },

        updateList: function (items) {

            for (var i = 0; i < this.itemsCached; i++) {
                this.itemsCached[i].component.hide();
            }

            for (var i = 0; i < items.length; i++) {
                items[i].component.show();
            }
        },

        searchLocal: function (word) {
            var arr = [],
                items = this.itemsCached,
                isUpdate = false;

            for (var i in items) {
                var texto = items[i].label;

                if (PI.String.removeAcentos(texto.toLowerCase()).match(PI.String.removeAcentos(word).toLowerCase()) != null) {

                    if (items[i].component == undefined) {
                        arr.push($.extend(items[i], { label: texto, texto: this.filter(UI.MarkText.create(word, texto, 'ui-autocomplete-mark-text')) }));
                    } else {
                        isUpdate = true;
                        arr.push(this.items[i]);
                    }
                }
            }
            
            if (isUpdate) {                
                this.updateList(arr);
            } else {
                this.preencheList(arr);
            }
        },

        processType: function (word) {
            var self = this,
                firstLetterWord = (word[0] || '');

            if (this.searching) {
                return;
            }

            if (word.length == 0) {
                this.preencheList([]);
                return;
            }

            if (word.length < 2) {
                return;
            }

            if (this.lastLetterSearched == firstLetterWord) {
                this.searchLocal(word);
                return;
            }
            
            this.searching = true;

            this.lastLetterSearched = firstLetterWord;

            this.list.loading();

            if (this.searchCached[firstLetterWord] != undefined) {
                this.searching = false;
                this.popule(this.searchCached[firstLetterWord]);
                this.searchLocal(word);

                return;
            }

            this.event.trigger('search', firstLetterWord, function (items) {
                self.searching = false;
                self.popule(items);
                self.searchCached[firstLetterWord] = items;
                self.searchLocal(word);
            });
        },

        selectItem: function (item) {

            if (item == null) {
                item = this.list.getItems()[0];
            }

            this.view.hint.hide();

            this.list.hide();

            this.itemSelected = item;
            if (item != null) {
                this.changeText = true;
                this.textbox.set(item.label);
                this.event.trigger('select', item);
            } else {
                this.event.trigger('unselect');
            }
        },

        popule: function (items) {
            this.itemsCached = items;
        },

        find: function (cb) {
            for (var i = 0; i < this.itemsCached.length; i++) {
                if (cb(this.itemsCached[i]) == true) return this.itemsCached[i];
            }

            return null;
        },

        set: function (item) {

            if (this.itemsCached.length == 0) {
                this.popule([item]);
            }

            this.selectItem(item);
        },

        get: function () {
            return this.itemSelected;
        },

        clear: function () {
            this.textbox.set('');
            this.view.hint.hide();
        },

        setValidate: function (b) {
            this.textbox.setValidate(b);
        },

        events: {

            '{textbox} lostfocus': function () {
                var self = this;

                setTimeout(function () {
                    if (document.activeElement != document.body) {
                        self.list.hide();
                    }
                }, 50);
                
            },

            '{textbox} focus': function () {
                this.list.show();
            },

            '{textbox} keydown': function (e) {
                this.list.show();

                if (e.keyCode == PI.KEYBOARD.KEYUP) {
                    this.list.selectPreviewItem();                    
                }

                if (e.keyCode == PI.KEYBOARD.KEYDOWN) {                    
                    this.list.selectNextItem();
                }

                if (e.keyCode == PI.KEYBOARD.ENTER) {
                    this.selectItem(this.list.getItemSelected());
                }
            },

            '{textbox} change': function (value, e) {
                if (this.changeText) {
                    this.changeText = false;                   
                    return;
                }

                if (this.textbox.get().length == 0) {
                    this.itemSelected = null;
                    this.event.trigger('unselect');
                    this.view.hint.hide();
                    return;
                }
                
                this.processType(value);
            },

            '{list} item::click': function (item) {
                this.changeText = true;
                this.selectItem(item);
            }

        }

    });

});