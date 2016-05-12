yum.define([
	PI.Url.create('UI.Selection', '/selection.html'),
	PI.Url.create('UI.Selection', '/selection.css'),
    PI.Url.create('UI.Selection', '/item.js'),
    PI.Url.create('UI.Selection', '/button.js'),
    PI.Url.create('UI.Selection', '/separador.js'),
    PI.Url.create('UI.Selection', '/resize.js')
], function (html) {

    Class('UI.SelectionBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.iconLeft = "fa";

            this.items = [];
            this.seek = new PI.Seek(0, 0);            
            this.lastFound = 0;

            this.HEIGHT_MAX_LABEL = 34;

            this.enabled = true;
        },

        viewDidLoad: function(){
            var self = this;

            this.view.container.resize(function(){
                if(self.view.container.height() >= 350){
                    self.view.container.addClass('ui-selection-scroll');
                }else{
                    self.view.container.removeClass('ui-selection-scroll');
                }
            });
            
            if(this.transparent === true){
                this.view.button.removeClass().addClass('ui-selection-menu-button-transparent');
            }
            
            if(this.showArrow === false){
                this.view.arrow.hide();
            }

            this.base.viewDidLoad();
        },

        add: function (item) {
            var self = this;
            
            item.index = this.items.length;

            item.selection = this;

            this.items.push(item);

            this.seek.setMax(this.items.length - 1);

            if (item.isSelectable) {
                item.render(this.view.container);
            } else {
                item.render(this.view.options);
            }

            item.event.listen('update::label', function (label) {
                if (item.isSelected()) {
                    self.setLabel(label);
                }
            });
            
            item.event.listen('click', function (item) {
                self.select(item);
            });

            item.event.listen('mouse::enter', function (item) {
                self.seek.index(item.index);
            });

            item.event.listen('view::did::destroy', function () {
                self.items.splice(item.index, 1);
                self.unselect();
            });

        },

        getItems: function () {
            return this.items;
        },

        sort: function () {
            var itemSorting = [],
                itemNotSorting = [],
                items = [];

            for (var i in this.items) {
                var item = this.items[i];

                if (item.isSorting) {
                    itemSorting.push(item);
                } else {
                    itemNotSorting.push(item);
                }
            }

            itemSorting.sort(function (item1, item2) {
                return item1.getLabel() > item2.getLabel();
            });

            items = itemSorting.concat(itemNotSorting);

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (i == 0) {
                    item.view.element.insertBefore(this.items[i].view.element);
                } else {
                    item.view.element.insertAfter(items[i - 1].view.element);
                }
            }

            this.items = items;
        },

        setLabel: function (label, persistent) {
            persistent = persistent === false ? false : true;

            if (this.onSetLabel != undefined) {
                label = this.onSetLabel(label);
            }

            if (persistent) this.label = label;

            this.view.label.html(label);

            if (this.view.label.height() > this.HEIGHT_MAX_LABEL) {
                this.setLabel(PI.String.reticencias(label, label.length - 5), persistent);
            }
            
        },

        getLabel: function () {
            return this.view.label;
        },

        visible: function (visible) {
            
            if (visible) {
                this.view.menu.show();
            } else {
                this.view.menu.hide();
            }

        },

        toggle: function () {
            var v = this.view.menu.css('display');

            this.visible(v == 'block' ? false : true);
        },

        clear: function () {
            
            while (this.items.length != 0) {
                this.items[this.items.length - 1].destroy();
            }

            this.items = [];
        },

        evidencia: function (item) {
            this.removeAllEvidencia();

            item.evidencia(true);
            //item.focus();
        },

        removeAllEvidencia: function () {
            for (var i in this.items) {
                this.items[i].evidencia(false);
            }
        },

        unselectall: function () {
            for (var i in this.items) {
                this.items[i].select(false);
            }
        },

        setFirst: function () {
            if (this.items.length > 0) {
                this.set(this.items[0]);
            }
        },

        find: function (cb) {
            
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].isSelectable && cb(this.items[i]) == true) {
                    return this.items[i];
                }
            }

            return null;
        },

        unselect: function () {
            this.unselectall();
            this.removeAllEvidencia();
            this.setLabel(this.label, false);
            this.seek.index(0);
            this.lastFound = 0;
        },

        select: function (item) {

            this.removeAllEvidencia();

            if (item.isSelectable) {

                this.unselectall();
                item.select(true);

                this.setLabel(item.getLabel(), false);
                this.seek.index(item.index);

                this.lastFound = 0;
                this.event.trigger('change', item);
            }

            this.visible(false);
        },

        search: function (code) {
            var c = String.fromCharCode(code),
				v = this.items,
			    b = true;

            for (var i = this.lastFound; i < v.length; i++) {
                if (v[i].isSelectable && v[i].getLabel().toUpperCase().indexOf(c) == 0) {
                    if (v[i].isSelected() == false) {
                        this.select(v[i]);
                        this.lastFound = i + 1;
                        b = false;
                        break;
                    }
                }
            }

            if (b) this.lastFound = 0;
        },

        get: function () {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];

                if (item.isSelected()) {
                    if (item.dataModelValue == undefined) {
                        if (this.dataModelProperty == undefined) {
                            return item;
                        } else {
                            return item[this.dataModelProperty];
                        }
                        
                    }
                    return item.dataModelValue;
                }
            }

            return null;
        },

        set: function (item) {

            if (PI.Type.isFunction(item)) {
                for (var i in this.items) {
                    if (item(this.items[i])) {
                        this.set(this.items[i]);
                        break;
                    }
                }

                return;
            }

            if (item == null) return;
            this.select(item);
        },

        setValidate: function (b) {
            if (b) {                
                this.view.button.removeClass('ui-selection-menu-button-invalid');
            } else {
                this.view.button.addClass('ui-selection-menu-button-invalid');
            }
        },

        setEnable: function (b) {
            
            this.enabled = b;

            if (b) {
                this.view.button.removeClass('ui-selection-menu-button-disabled');
            } else {
                this.view.button.addClass('ui-selection-menu-button-disabled');                
            }
        },

        events: {

            '@menu mousewheel': function (ee, e) {
                if (!this.enabled) return;

                var menu = $(ee),
                    s = menu.scrollTop() + menu.height(),
					h = menu[0].scrollHeight,
					d = e.originalEvent.wheelDelta;

                if (s == h && d < 0) {
                    return false;
                } else {
                    return true;
                }
            },

            '@button click': function () {
                if (!this.enabled) return;

                this.toggle();
                return false;
            },

            '@button keydown': function (t, e) {
                if (!this.enabled) return;

                switch (e.keyCode) {
                    case PI.KEYBOARD.KEYUP: //seta up						

                        this.seek.prev();

                        this.evidencia(this.items[this.seek.index()]);

                        this.visible(true);

                        return false;
                    case PI.KEYBOARD.KEYDOWN: //seta down

                        this.seek.next();

                        this.evidencia(this.items[this.seek.index()]);

                        this.visible(true);

                        return false;
                    case PI.KEYBOARD.ENTER: // enter

                        this.select(this.items[this.seek.index()]);

                        break;
                    default:
                        this.search(e.keyCode);
                        break;
                }
            },
            
            '{window} click': function (e, ee) {
                if ($(ee.target).parents(this.view.getElementIdWithHash()).length == 0) {
                    this.visible(false)
                }
            }
        }

    });

});