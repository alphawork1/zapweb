yum.define([
    PI.Url.create('Auth', '/model.js')
], function (html) {

    Class('Service.Auth').Extend(PI.Service).Body({

        load: function(app){
            this.base.load(app);
            
            var auth = new Auth.Model();
            auth.isAutenticate();
            
            EventGlobal.listen('error::401', function(){
                window.location = '/login';
            });
        },

        routes: {
            
        },

        events: {
            
        }

    });

});