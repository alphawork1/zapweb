/**
 * Configuration Globais
 */
Application.config({

	resources: {
		cache: true
	},
	
	model: {
		// 'url': 'http://zapservice.siempresistemas.info'
		// 'url': 'http://localhost:5921'
        url: ''
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
PI.Url.add('Home',          'Modules', '/home');
PI.Url.add('Usuario',       'Modules', '/usuario');
PI.Url.add('Unidade',       'Modules', '/unidade');
PI.Url.add('Permissao',     'Modules', '/permissao');
PI.Url.add('Notificacao',   'Modules', '/notificacao');
PI.Url.add('Cidade',        'Modules', '/cidade');
PI.Url.add('Fornecedor',    'Modules', '/fornecedor');
PI.Url.add('Telefone',      'Modules', '/telefone');
PI.Url.add('Endereco',      'Modules', '/endereco');
PI.Url.add('Contato',       'Modules', '/contato');
PI.Url.add('Financeiro',    'Modules', '/financeiro');
PI.Url.add('Util',          'Modules', '/util');
PI.Url.add('Arquivo',       'Modules', '/arquivo');
PI.Url.add('RealTime',      'Modules', '/realtime');
PI.Url.add('Historico',     'Modules', '/historico');
PI.Url.add('Sindico',       'Modules', '/sindico');
PI.Url.add('Condominio',    'Modules', '/condominio');
PI.Url.add('Administradora','Modules', '/administradora');
PI.Url.add('Agenda',        'Modules', '/agenda');
PI.Url.add('Variavel',      'Modules', '/variavel');

/**
* Service
*/
PI.Service.add( 'Agenda', 
                'Administradora', 
                'Condominio', 
                'Sindico', 
                'Unidade', 
                'Permissao', 
                'Usuario', 
                'Fornecedor', 
                'Financeiro', 
                'RealTime', 
                'Notificacao');