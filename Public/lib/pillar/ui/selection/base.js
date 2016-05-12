yum.define([
			
], function (html) {

    Class('UI.Selection.Base').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.classSelection = 'ui-selection-item-selected';
            this.classHighlight = 'ui-selection-item-highlight';
            this.classDisable = "ui-selection-item-disabled";

            this.isSelectable = true;
            this.isSorting = false;
        },

        select: function (b) {
            if (b) {
                this.view.element.addClass(this.classSelection);
            } else {
                this.view.element.removeClass(this.classSelection);
            }

            return this;
        },

        isSelected: function () {
            return this.view.element.hasClass(this.classSelection);
        },

        selected: function (b) {
            var self = this;

            this.event.listen('view::did::load', function () {
                self.selection.select(self);
            });

            return this;
        },

        evidencia: function (b) {
            if (b) {
                this.view.element.addClass(this.classHighlight);
            } else {
                this.view.element.removeClass(this.classHighlight);
            }

            return this;
        },

        getLabel: function () {
            return this.view.label.html();
        },

        setLabel: function (label) {
            this.view.label.html(label);

            this.event.trigger('update::label', label);

            return this;
        }

    });

});