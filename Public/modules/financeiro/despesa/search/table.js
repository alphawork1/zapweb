yum.define([
	PI.Url.create('Financeiro', '/despesa/search/table.html'),
	PI.Url.create('Financeiro', '/despesa/search/table.css'),
	PI.Url.create('Financeiro', '/despesa/search/order.js'),
	PI.Url.create('Lib.TableOrder', '/tableorder.js')
], function(html){
	
	Class('Financeiro.Despesa.Search.Table').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);

			this.contextMenu = new UI.ContextMenu();

			this.isNew = true;
		},

		viewDidLoad: function(){

			var newTab = PI.Url.create('Financeiro', '/despesa/search/open.png').getUrl();
			var imageEdit = PI.Url.create('Financeiro', '/despesa/search/edit.png').getUrl();
			var imageCheck = PI.Url.create('Financeiro', '/despesa/search/check.png').getUrl();

			this.contextMenu.setContext(this.view.table);

			this.editar 	= new UI.ContextMenuItem({ label: 'Editar', imageUrl: imageEdit, at: false });
			this.newTab 	= new UI.ContextMenuItem({ label: 'Nova Guia', imageUrl: newTab, at: false });
			this.data 		= new UI.ContextMenuItem({ label: 'Data', imageUrl: imageCheck, at: '1' });
			this.numr 		= new UI.ContextMenuItem({ label: 'Número', imageUrl: imageCheck, at: '2' });
			this.status 	= new UI.ContextMenuItem({ label: 'Status', imageUrl: imageCheck, at: '3' });
			this.forn 		= new UI.ContextMenuItem({ label: 'Fornecedor', imageUrl: imageCheck, at: '4' });
			this.uni 		= new UI.ContextMenuItem({ label: 'Unidade', imageUrl: imageCheck, at: '5' });
			this.usi 		= new UI.ContextMenuItem({ label: 'Comprado Por', imageUrl: imageCheck, at: '6' });
			this.valor 		= new UI.ContextMenuItem({ label: 'Valor', imageUrl: imageCheck, at: '7' });

			this.contextMenu.addItem(this.editar);
			this.contextMenu.addItem(this.newTab);
			this.contextMenu.addItem(this.data);
			this.contextMenu.addItem(this.numr);
			this.contextMenu.addItem(this.status);
			this.contextMenu.addItem(this.forn);
			this.contextMenu.addItem(this.uni);
			this.contextMenu.addItem(this.usi);
			this.contextMenu.addItem(this.valor);

			this.set([]);

		    this.base.viewDidLoad();
		},

		loading: function(b){
		    b ? this.view.loading.show() : this.view.loading.hide();

		    this.view.tbody.hide();
		    this.view.empty.hide();

		    return this;
		},

		set: function(despesas){
		    var tpl = '<tr despesa-id="@{Id}"> <td style="text-align: center;">@{Data}</td> <td>@{Numero}</td> <td>@{Financeiro.Despesa.Status.convert(this.Status)}</td> <td style="text-align: center;">@{Fornecedor.Fantasia}</td> <td style="text-align: center;">@{Unidade.Nome}</td> <td style="text-align: center;">@{Usuario.Nome}</td> <td style="text-align: right;">R$ @{PI.Convert.DolarToReal(this.Total)}</td> </tr>';
			var view = '';

			this.loading(false);
			this.view.tbody.show();			

			for(var i = 0 ; i < despesas.length ; i++){
			   var despesa = despesas[i];

				view += Mvc.Helpers.tpl(despesa, tpl);
			}

			if(despesas.length > 0){
			    this.view.empty.hide();
			}else{
				this.view.empty.show();
			}

			this.view.tbody.html(view);

			this.isNew ? this.view.table.tablesorter() : this.view.table.trigger('update');
			this.isNew = false;
		},

		events: {

			'{editar} click': function(item){
				
				try{
					var id = parseInt( this.contextMenu.target.parent().attr('despesa-id') );
					if (PI.Type.isNumber(id)) {
						PI.Url.Hash.to('Despesa/Editar/' + id);
					};
				}catch(e){
				    
				}
			},

			'{newTab} click': function(item){
				try{
					var id = parseInt( this.contextMenu.target.parent().attr('despesa-id') );
					if (PI.Type.isNumber(id)) {
						var tab = window.open('about:blank', '_blank');
						tab.location = PI.Url.create('BaseUrl', '#/Despesa/Editar/' + id).getUrl();
					};
				}catch(e){
				    
				}
			},

			'{contextMenu} select': function(item){

				if (item.at === false) return;

				this.view.table.find('th:nth-child(' + item.at + '), td:nth-child(' + item.at + ')').toggle();
				item.view.image.toggle();
			},

			'{contextMenu} open': function(e){
				if (this.rowSelect != undefined) {
					this.rowSelect.removeClass('select');
				}

				this.rowSelect = e.parent();

				this.rowSelect.addClass('select');
			},

			'{contextMenu} close': function(e){
				if (this.rowSelect == undefined) return;

				this.rowSelect.removeClass('select');
			}

		}
	
	});
	
});