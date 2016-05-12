yum.define([
	PI.Url.create('Permissao', '/painel/painel.html'),
	PI.Url.create('Permissao', '/painel/painel.css'),
    PI.Url.create('Permissao', '/painel/item.js')
], function (html) {

    Class('Permissao.Painel').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
            this.grupo = '';

            this.items = [];
        },

        add: function (permissao) {
            if (this.length() == 0) {
                this.view.list.html('');
            }

            if (permissao.Grupo != this.grupo) {
                this.grupo = permissao.Grupo;
                this.view.list.append('<li class="permissao-painel-title">' + permissao.Grupo + '</li>');
            }

            var item = new Permissao.PainelItem({
                permissao: permissao
            });

            item.render(this.view.list);

            this.items[permissao.Nome] = item;
        },

        length: function () {
            var c = 0;
            for (var i in this.items) c++;
            return c;
        },

        clear: function () {
            for (var i in this.items) {
                this.items[i].checkbox.set(false);
            }
        },

        set: function (grupo) {
            var permissoes = grupo.Permissoes;
            for (var i in permissoes) {
                var permissao = permissoes[i];

                this.items[permissao.Nome].checkbox.set(true);
            }
        },
        
        get: function () {
            var arr = [];

            for (var permissao in this.items) {
                
                if (this.items[permissao].checkbox.get()) {
                    arr.push(this.items[permissao].permissao);
                }
            }

            return arr;
        }

    });

});