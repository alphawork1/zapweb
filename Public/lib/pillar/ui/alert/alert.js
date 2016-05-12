yum.define([
    PI.Url.create('UI.Alert', '/alert.html'),
    PI.Url.create('UI.Alert', '/alert.css'),
    PI.Url.create('UI.Button', '/button.js')
], function (html) {
	
    Class('UI.Alert').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

		    this._callback = PI.Function.cb;
		    this.opened = false;

		    this.btnOk = new UI.Button({
		        label: 'Ok',
		        classes: Application.getConfig('alert.ok.classes'),
		        style: {
		            padding: 'padding: 3px 10px;',
                    float: 'right'
		        }
		    });
        },

        viewDidLoad: function () {
            this.hide();

            this.base.viewDidLoad();
        },

		title: function(title){
			if(title == undefined) return;
			this.view.title.html(title);		
		},

		message: function(message){
		    if (message == undefined) return;
			this.view.content.html(message);
		},

		callback: function(callback){
		    this._callback = callback || PI.Function.cb;
		},

		show: function(title, message, callback){
			this.title(title);
			this.message(message);
			this.callback(callback);

			this.view.element.fadeIn('fast');
			this.btnOk.focus();

			this.opened = true;
		},

		success: function (title, message, callback) {
		    this.view.container.removeClass().addClass('ui-alert-container-success');

		    this.show(title, message, callback);
		},

		warning: function (title, message, callback) {
		    this.view.container.removeClass().addClass('ui-alert-container-warning');

		    this.show(title, message, callback);
		},

		danger: function (title, message, callback) {
		    this.view.container.removeClass().addClass('ui-alert-container-danger');

		    this.show(title, message, callback);
		},

		error: function (title, message, callback) {
		    this.danger(title, message, callback);
		},

		info: function (title, message, callback) {
		    this.view.container.removeClass().addClass('ui-alert-container-default');

		    this.show(title, message, callback);
		},

		hide: function(){
		    this.view.element.hide();
		    this.opened = false;
		},

		events: {

		    '{btnOk} click': function () {
				this.hide();
				this._callback();
			},

			'{btnOk} enter': function () {
				this.hide();
				this._callback();
			},

			'{window} click': function (e, ee) {
			    if (this.opened && $(ee.target).parents('.ui-alert').length == 0) {
			        e = this.view.element;
			        e.addClass('anime-pulse');
			        setTimeout(function () {
			            e.removeClass('anime-pulse');
			        }, 500);
			    }
			}

		}

	});

    window.Alert = new UI.Alert();
    Alert.render($('body'));
});