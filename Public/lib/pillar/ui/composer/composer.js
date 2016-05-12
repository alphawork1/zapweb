yum.define([
    PI.Url.create('UI.Composer', '/composer.html'),
    PI.Url.create('UI.Composer', '/composer.css')
], function (html) {

    /**
     * @class UI.Composer
     */
    Class('UI.Composer').Extend(Mvc.Component).Body({

        instances: function () {

            /**
             * Conteudo do body
             *
             * @property {string} body
             * @property {string} footer
             */

             /**
              * Conteudo do footer
              *
              * @property {string} footer
              */

              /**
               * Titulo do dialog
               * 
               * @property {string} title
               */
            this.view = new Mvc.View(html);
        },

        viewDidLoad: function () {
            this.base.viewDidLoad();

            this.hide();
        },

        /**
         * Mostra o popup
         * 
         * @method open
         * @return {this}
         */
        open: function () {
            this.show();

            this.event.trigger('open');

            return this;
        },

        /**
         * Oculta o popup
         * 
         * @method close
         * @return {this}
         */
        close: function () {
            this.hide();

            this.event.trigger('close');

            return this;
        },

        /**
         * Define o titulo do dialog
         * 
         * @method setTitle
         * @param {string} title
         * @return {this}
         */
        setTitle: function (title) {
            this.view._title.html(title);

            return this;
        },

        events: {

            '@close click': function () {
                this.close();
                // this.destroy();
            },

            '.ui-composer-body mousewheel': function (ee, e) {
                //return this.scrollInsideOnly(this.view.dialogBody, ee, e);
            },
        }

    });

});