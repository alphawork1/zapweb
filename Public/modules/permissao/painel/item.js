yum.define([
	//PI.Url.create('Permissao', '/painel/item.html'),
	//PI.Url.create('Permissao', '/painel/item.css')
], function (html) {

    Class('Permissao.PainelItem').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<li><div at="checkbox"></div><div style="margin-left: 30px;">@{permissao.Descricao}</div></li>');

            this.checkbox = new UI.CheckBox();
        }

    });

});