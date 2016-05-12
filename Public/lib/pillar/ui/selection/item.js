yum.define([
	PI.Url.create('UI.Selection', '/item.html'),
	PI.Url.create('UI.Selection', '/item.css'),
    PI.Url.create('UI.Selection', '/base.js')
], function (html) {

    Class('UI.Selection.Item').Extend(UI.Selection.Base).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.showMenu = false;
            this.showEditar = true;
            this.showExcluir = true;
            this.isSorting = true;

            this.menu = new UI.MenuDown();
        },

        render: function(e){

            this.base.render(e);

            this.menu.setContainer(e);
        },

        viewDidLoad: function () {
            this.editar = new UI.MenuDownItem({ label: 'Editar', iconLeft: 'fa fa-edit text-info' });
            this.excluir = new UI.MenuDownItem({ label: 'Excluir', iconLeft: 'fa fa-minus-circle text-danger' });

            if (this.showEditar) this.menu.add(this.editar);
            if (this.showExcluir) this.menu.add(this.excluir);

            if (!this.showMenu) this.menu.hide();

            this.base.viewDidLoad();
        },

        events: {

            '{menu} show': function () {
                this.view.menu.removeClass('ui-selection-item-menu-hide');
            },

            '{menu} hide': function () {
                this.view.menu.addClass('ui-selection-item-menu-hide');
            },

            '@selectionItem mouseenter': function (e) {
                this.event.trigger('mouse::enter', this);
            },

            '@selectionItem mouseleave': function (e) {
                this.event.trigger('mouse::leave', this);
            },

            '@selectionItem click': function (e) {
                if (!this.isEnabled()) return;
                this.event.trigger('click', this);
            }

        }

    });

});