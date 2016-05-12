yum.define([
	PI.Url.create('Arquivo', '/modal/modal.html'),
	PI.Url.create('Arquivo', '/modal/modal.css'),
    PI.Url.create('Lib', '/zoom/zoom.js'),
    PI.Url.create('Lib', '/drag/drag.js')
], function (html) {

    Class('Arquivo.Modal').Extend(UI.Modal).Body({

        instances: function () {
            this.view.inject({
                title: 'Imagem',
                body: html
            });

            this.width = '850px';
        },

        viewDidLoad: function () {
            var zoom = this.view.containerImage.panzoom();

            this.view.modal.drag();

            zoom.parent().on('mousewheel.focal', function (e) {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                zoom.panzoom('zoom', zoomOut, {
                    increment: 0.1,
                    animate: false,
                    focal: e
                });
            });

            this.base.viewDidLoad();
        }

    });

});