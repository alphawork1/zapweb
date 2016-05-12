yum.define([
	PI.Url.create('UI.TreeView', '/treeview.html'),
    PI.Url.create('UI.TreeView', '/zTreeStyle.css'),
    PI.Url.create('UI.TreeView', '/ztree.js'),
    PI.Url.create('UI.TreeView', '/node.js'),
    PI.Url.create('UI.ContextMenu', '/contextmenu.js')
], function (html) {

    Class('UI.TreeView').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.contextMenu = new UI.ContextMenu();

            this.id = PI.Util.UUID();

            this.settings = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },

                callback: {
                    //beforeDrag: beforeDrag,
                    //beforeEditName: beforeEditName,
                    //beforeRemove: beforeRemove,
                    //beforeRename: beforeRename,
                    //onRemove: onRemove,
                    //onRename: onRename
                }
            };

            this.nodes = [];
        },

        viewDidLoad: function () {
           $.fn.zTree.init(this.view.treeview, this.settings, this.nodes);

            this.contextMenu.setContext(this.view.treeview.find('a'));

            this.base.viewDidLoad();
        },

        addNode: function (node) {
            var id = this.view.treeview.attr('id');
            var treeObj = $.fn.zTree.getZTreeObj(id);
            var newNode = {
                name: node.label,
                id: node.Id,
                pId: node.Pai
            };

            if (node.Pai == 0) {
                newNode = treeObj.addNodes(null, newNode);
            } else {
                var node = treeObj.getNodesByParam("id", node.Pai, null)[0];
                console.log(node);
                node.addNodes(null, newNode);
            }

            
        }


    });

});