yum.define([
	PI.Url.create('UI.TabBar', '/tabbar.css')
], function () {

    Class('UI.TabBar').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div class="ui-tabbar"><ul at="list" class="@{this.skin}"></ul></div>');
            
            this.skin = 'ui-tabbar-list-default';
            
            this.tabs = [];
        },

        add: function (id, label, active) {
            var view = '<li class="ui-tabbar-list-item @{active}" tabbar-id="@{id}">@{label} <div class="ui-tabbar-whitebar"></div></li>',
                _active = active === true ? 'active' : '',
                item = { id: id, label: label, active: _active };

            this.tabs.push(item);

            this.view.list.append(Mvc.Helpers.tpl(item, view));

            this.container.element.find('[tabbar-container="' + id + '"]').addClass('anime-fadein-topdown');

            if (active !== true) {
                this.container.element.find('[tabbar-container="' + id + '"]').hide();
            }
            
            return this;
        },
        
        hideTab: function(id){
            this.view.element.find('[tabbar-id="' + id + '"]').hide();
        },

        hideContainers: function () {
            for (var i = 0; i < this.tabs.length; i++) {
                this.container.element.find('[tabbar-container="' + this.tabs[i].id + '"]').hide();
            }

            return this;
        },

        unselect: function () {
            this.view.element.find('[tabbar-id]').removeClass('active');
            this.container.element.find('[tabbar-container]').hide();

            return this;
        },

        select: function (id) {
            this.unselect();

            this.view.element.find('[tabbar-id="' + id + '"]').addClass('active');
            this.container.element.find('[tabbar-container="' + id + '"]').show();

            return this;
        },

        events: {

            '[tabbar-id] click': function (e) {
                var id = $(e).attr('tabbar-id');

                this.select(id);
            }

        }

    });

});