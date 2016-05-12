/**
 * Configuration Globais
 */
Application.config({

	resources: {
		cache: true
	},
	
	model: {
		// 'url': 'http://zapweb.siempresistemas.info'
		'url': 'http://localhost:5921'
	},

    ajax: {
        contentType: 'application/json',
        credentials: true,
        cors: true
    },

    textbox: {
        classes: 'form-control'
    },

    textarea: {
        classes: 'form-control'
    },

    button: {
        classes: 'btn btn-sm button'
    },

    checkbox: {
        classes: 'ui-checkbox'
    },

    confirm: {
        ok: {
            classes: 'btn btn-sm button verde'
        },

        cancelar: {
            classes: 'btn btn-sm button cinza'
        }
    },

    alert: {
        ok: {
            classes: 'btn btn-sm button verde'
        }
    }
});

// PI.Url.add('App', 'https://s3-sa-east-1.amazonaws.com/elasticbeanstalk-sa-east-1-685799640328/zapweb');

PI.Url.add('BaseUrl',       PI.Url.create(window.location.toString()).href());
PI.Url.add('Public',        'BaseUrl', '/public');
PI.Url.add('App',           'BaseUrl', '/public');
PI.Url.add('Modules',       'App', '/modules');
PI.Url.add('Lib',           'App', '/lib');
PI.Url.add('Logo',          'Public', '/files/logo.png');
PI.Url.add('UI',            'Lib', '/pillar/ui');

/**
 * Libs
 */
PI.Url.add('Lib.Autocomplete',  'Lib', '/autocomplete');
PI.Url.add('Lib.TableFilter',   'Lib', '/tablefilter');
PI.Url.add('Lib.TableOrder',    'Lib', '/tableorder');
PI.Url.add('Lib.DataTime',      'Lib', '/datatime');
PI.Url.add('Lib.Tips',          'Lib', '/tips');
PI.Url.add('Lib.Scroll',        'Lib', '/scroll');

/**
 * Url Alias
 */
PI.Url.add('Auth',          'Modules', '/auth');