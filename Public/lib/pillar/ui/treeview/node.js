yum.define([
	//PI.Url.create('UI.TreeView', 'node.html'),
	//PI.Url.create('UI.TreeView', 'node.css')
], function (html) {

    Class('UI.TreeViewNode').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);
        }

    });

});