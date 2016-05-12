yum.define([
	PI.Url.create('Condominio', '/campanha/item.html'),
	PI.Url.create('Condominio', '/campanha/item.css')
], function(html){

	Class('Condominio.Campanha.Item').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);			
		},
		
		viewDidLoad: function(){
			var tpl = '<a class="condominio-campanha-item-arquivo" id="@{Id}" href="javascript:void(0)">@{this.rowIndex}. @{PI.File.filename(this.Nome)}</a>';
			var view = Mvc.Helpers.prepare(this.campanha.Anexos, tpl).toView();
			
			this.view.campanhaAnexos.html( view );
						
			this.base.viewDidLoad();
		},
		
		getAnexoById: function(id){
			for (var i = 0; i < this.campanha.Anexos.length; i++) {
				var anexo = this.campanha.Anexos[i];
				
				if(anexo.Id == id) return anexo;				
			}
		},
		
		events: {
		
			'.condominio-campanha-item-arquivo click': function(e){
				var el = $(e);
				var id = el.attr('id'); 
				var anexo = this.getAnexoById(id);
				
				anexo.Campanha = this.campanha;
				
				window.location = Condominio.Campanha.Model.create( anexo ).getUrlPdf();
			}
		}

	});

});