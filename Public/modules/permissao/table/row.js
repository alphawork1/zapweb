yum.define([
	PI.Url.create('Permissao', '/table/row.html'),
	PI.Url.create('Permissao', '/table/row.css')
], function (html) {

    Class('Permissao.TableRow').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.checkbox = new UI.CheckBox();
        }

    });

});