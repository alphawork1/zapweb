yum.define([
	PI.Url.create('Public', '/ui.config.js'),
    PI.Url.create('Public', '/app.css'),
    PI.Url.create('Home', '/page.js'),
    PI.Url.create('Auth', '/page.js'),
    PI.Url.create('UI', '/progress/progress.js')
], function (html) {
    
    Class('App').Extend(Mvc.Component).Body({

        instances: function () {
            this.progressBar = new UI.Progress({
                color: '#007acc'
            });
        },

        viewDidLoad: function () {
            var self = this;
            
            Auth.Model.create().isAutenticate().ok(function(usuario){
                
                Usuario.Current = usuario;
                
                if (PI.Cookie.get('unidade') == null) {
                    Unidade.Model.persistir( Usuario.Current.Unidade );
                    Unidade.Current = Usuario.Current.Unidade;
                }else{
                    Unidade.Current = new Unidade.Model( JSON.parse( PI.Cookie.get('unidade') ) );
                }

                self.home = new Home.Page();
                self.home.render(self.view.body);
               
               self.base.viewDidLoad();     
            }).error(function(){
                
                self.auth = new Auth.Page();
                self.auth.render(self.view.body);
                
                self.base.viewDidLoad();
            }).done(function(){
                $('#progress').remove();
            });            
        },

        progressLoad: function (total) {
            
            if(!this.progressBar.isRender()){
                this.progressBar.render( $('#progress') );
            }
            
            this.progressBar.total(total);
        }

    });

});