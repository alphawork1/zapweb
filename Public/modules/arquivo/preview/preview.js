yum.define([
	PI.Url.create('Arquivo', '/preview/preview.html'),
	PI.Url.create('Arquivo', '/preview/preview.css'),
    PI.Url.create('Lib', '/zoom/zoom.js'),
    PI.Url.create('Lib', '/drag/drag.js')
], function(html){
	
    var currentPreview = null;

	Class('Arquivo.Preview').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);
		},

        viewDidLoad: function () {
        	var self = this;

            if (this.arquivo.Tipo == 'application/pdf') {
                this.renderPdf();
            }else{
                this.renderImage()
            }

            if (currentPreview != null) {
                currentPreview.destroy();
            }

            currentPreview = this;

            this.view.element.animate({bottom: '0px'});

            this.base.viewDidLoad();
        },

        renderPdf: function(){
            this.view.containerImage.hide();
            this.view.containerPdf.show();

            this.view.iframe.height(this.view.element.height());

            this.view.iframe.attr('src', this.arquivo.getUrl());
        },

        renderImage: function(){
            var self = this;
            var zoom = this.view.containerImage.panzoom();

            this.view.containerImage.show();
            this.view.containerPdf.hide();

            this.view.image.attr('src', this.arquivo.getUrl());

            this.view.element.drag({
                x: false,
                cursor: 's-resize',
                move: function(){
                    self.view.element.css('height', '100%');
                    // self.view.iframe.height(this.view.element.height());
                },
            });

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
        },

        events: {

            '@closePreview click': function(){
                currentPreview = null;
                this.destroy();
            }

        }
	
	});
	
});