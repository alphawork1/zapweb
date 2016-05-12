yum.define([
	PI.Url.create('UI.Search', '/search.html'),
	PI.Url.create('UI.Search', '/search.css'),
    PI.Url.create('UI.Search', '/containers/containers.js'),
], function (html) {

    Class('UI.Search.TextBox').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.textbox = new UI.TextBox({
                placeholder: 'Pesquisar',
                classes: 'ui-search-textbox',
                iconLeft: 'fa fa-search',
                style: {
                    'text-indent': '20px'
                }
            });

            this.modelPessoa = new Pessoa.Model();
        },

        init: function (options) {
            options.containers.textbox = this.textbox;
            this.base.init();
        },

        events: {

            '{textbox} change': function (texto) {
                var self = this;

                this.modelPessoa.search(texto).ok(function (pessoas) {
                    var arr = [];

                    for (var i = 0; i < pessoas.length; i++) {
                        var pessoa=pessoas[i];

                        if (pessoas[i].Tipo == Pessoa.Tipo.PESSOA_FISICA) {
                            arr.push({ href: '#PessoaFisica/Editar/' + pessoa.Id, label: pessoa.Nome });
                        } else {
                            arr.push({ href: '#PessoaJuridica/Editar/' + pessoa.Id, label: pessoa.RazaoSocial });
                        }
                    }

                    self.containers.addListItem(arr);
                });
            },

            '{textbox} focus': function () {
                this.containers.open();
            },

            '{textbox} lostfocus': function () {
                //this.containers.close();
            },

        }

    });

});