yum.define([
	PI.Url.create('Telefone', '/item.html'),
	PI.Url.create('Telefone', '/item.css'),
    PI.Url.create('Telefone', '/model.js')
], function (html) {

    Class('Telefone.Item').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.tipo = new UI.SelectionBox({ label: 'Tipo' });
            this.numero = new UI.TextBox({
                placeholder: 'Numero'
            });

            this.remove = new UI.Button({
                label: 'Remover',
                classes: 'vermelho',
                iconLeft: 'fa fa-trash-o'
            });

        },

        viewDidLoad: function () {
            this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.RESIDENCIAL, label: 'Residencial', showMenu: false }))
            this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.COMERCIAL, label: 'Comercial', showMenu: false }))
            this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.CELULAR, label: 'Celular', showMenu: false }))
            this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.FAX, label: 'Fax', showMenu: false }))
            this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.WHATSAPP, label: 'Whatsapp', showMenu: false }))
            // this.tipo.add(new UI.Selection.Item({ id: Telefone.Tipo.CONDOMINIO, label: 'Condomínio', showMenu: false }))

            this.base.viewDidLoad();
        },

        get: function () {
            var tipo = this.tipo.get();
            if (tipo == null) tipo = 0;
            else tipo = tipo.id;

            if (this.numero.get().length == 0) return null;

            return {
                Numero: this.numero.get(),
                Tipo: tipo
            };
        },

        set: function (telefone) {
            this.tipo.set(function (item) {
                return item.id == telefone.Tipo
            });

            this.numero.set(telefone.Numero);
        },

        events: {

            '{remove} click': function () {
                this.event.trigger('destroy');
                
                this.destroy();                
            }

        }

    });

});