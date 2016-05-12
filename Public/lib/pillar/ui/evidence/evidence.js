yum.define([
	PI.Url.create('UI.Evidence', '/evidence.html'),
	PI.Url.create('UI.Evidence', '/evidence.css')
], function (html) {

    Class('UI.Evidence').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        },

        anime: function () {
            var evidence = this.view.element;

            evidence.addClass('ui-evidence-show');

            setTimeout(function () {
                evidence.removeClass('ui-evidence-show');
            }, 3000);
        },

    });

    jQuery.fn.evidence = function (options) {
        var defaults = {
            start: '#FFDE39',
            end: '#FFFFFF',
            duration: 8000
        },
            n = $(this);

        $.extend(defaults, options);
        try {
            n.css('background-color', defaults.start);
            n.addClass('ui-evidence-element');
            setTimeout(function () {
                n.css('background-color', defaults.end);
            }, 10);

        } catch (str) {

        }
    }

});