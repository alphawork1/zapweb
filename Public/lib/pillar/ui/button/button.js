yum.define([
    PI.Url.create('UI.Button', '/button.html'),
    PI.Url.create('UI.Button', '/button.css')
], function (html) {

    Class('UI.Button').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this._lock = false;
            this.classes = Application.getConfig('button.classes');
        },

        viewDidLoad: function () {

            if (this.iconRight == undefined) this.view.iconRight.hide();
            if (this.iconLeft == undefined) this.view.iconLeft.hide();

            this.base.viewDidLoad();
        },

        anime: function (b) {
            if (b) {
                this.view.iconLeft.hide();
                this.view.anime.show();
            } else {
                this.view.iconLeft.show();
                this.view.anime.hide();
            }

            return this;
        },

        setLabel: function (label) {
            this.view.label.html(label);
            return this;
        },

        getLabel: function () {
            return this.view.label.html();
        },

        lock: function () {
            this._lock = true;
            return this;
        },

        unlock: function () {
            this._lock = false;
            return this;
        },

        isLock: function () {
            return this._lock;
        },

        focus: function () {
            this.view.button.focus();
        },

        events: {

            '@button click': function () {
                if (this.isLock()) return;

                this.event.trigger('click');
            }

        }

    });

});