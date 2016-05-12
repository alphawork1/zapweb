yum.define(function () {

    Class('Auth.Model').Extend(Mvc.Model.Base).Body({

        instances: function () {
            
        },

        init: function () {
            this.base.init('/auth');
        },

        validations: function () {
            return {
                'Username': new Mvc.Model.Validator.Required('O login do usuário é obrigatório'),
                'Password': new Mvc.Model.Validator.Required('A senha do usuário é obrigatória'),
                'Permissao': new Mvc.Model.Validator.Required('Selecione uma permissão para o usuario')
            };
        },

        actions: {
            'entrar': '/entrar',
            'sair': '/sair',
            'isAutenticate': '/IsAutenticate?classname=Usuario.Model'
        }

    });

});