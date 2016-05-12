yum.define([
    PI.Url.create('UI.Dialog', '/dialog.html'),
    PI.Url.create('UI.Dialog', '/dialog.css')
], function (html) {

    Class('UI.Dialog').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();

            this.hide();
        },

        open: function () {
            this.show();
        },

        close: function () {
            this.hide();
        },

        setTitle: function (title) {
            this.view._title.html(title);
        },

        events: {

            '@close click': function () {
                this.hide();
            },

            '.ui-dialog-body mousewheel': function (ee, e) {
                //return this.scrollInsideOnly(this.view.dialogBody, ee, e);
            },
        }

    });

});