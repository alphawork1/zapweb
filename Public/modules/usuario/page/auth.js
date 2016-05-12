yum.define([
	PI.Url.create('Usuario', '/page/auth.html'),
	PI.Url.create('Usuario', '/page/auth.css'),
], function(html){
	
	Class('Usuario.PageAuth').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);

			this.username = new UI.TextBox({
				dataModel: 'Username',
				placeholder: 'Login de acessso'
			});

			this.password = new UI.TextBox({
				type: 'password',
				dataModel: 'Password',
				placeholder: 'Senha'
			});

			this.permissao = new Permissao.Select({
				placeholder: 'Permissão',
				dataModel: 'Permissao'
			});

			this.account = new Auth.Model();

		},

		set: function(account){
		    if(account == null) return;

			this.account = account;

			this.injectModelToView(account);
		 },

		get: function(account){
			var s = this.injectViewToModel(this.account);

			if(!s.status){
				throw s.messages;
			}

			return this.account;
		 }
	
	});
	
});  