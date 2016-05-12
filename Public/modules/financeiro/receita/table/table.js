yum.define([
	PI.Url.create('Financeiro', '/receita/table/table.html'),
	PI.Url.create('Financeiro', '/receita/table/table.css'),
	PI.Url.create('Financeiro', '/receita/table/row.js')
], function(html){

	Class('Financeiro.Receita.Table').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View(html);

			this.addNew = new UI.Button({
				label: 'Adicionar Item',
				iconLeft: 'fa fa-plus',
				classes: 'cinza',
			});

			this.total = new UI.Label({
				label: 'R$ 0,00',
				classes: 'financeiro-table-control',
				style: {
					'float': 'right'
				}
			});

			this.rows = [];
		},

		addRow: function(){
			var index = this.rows.length;
			var self = this;
			var item = new Financeiro.Receita.TableRow();

			item.render( this.view.tbody );

			item.event.listen('valor::change', function(){
				self.calculeTotal();
			});

			item.event.listen('view::did::destroy', function(){
				self.rows.splice(index, 1);
				self.calculeTotal();
			});

			this.rows.push(item);

			return item;
		 },

		calculeTotal: function(){
			var total = 0;

		    for(var i = 0 ; i < this.rows.length ; i++){
		        var row = this.rows[i];

			    total += row.getValor();
		    }

			this.total.set( 'R$ ' + PI.Convert.DolarToReal( total ) );
		 },

		get: function(){
			var arr = [];

			for(var i = 0 ; i < this.rows.length ; i++){
			   var row = this.rows[i];

				arr.push(row.get());
			}

			return arr;
		 },

		set: function(items){
			for(var i = 0 ; i < items.length ; i++){
			   this.addRow().set(items[i]);
			}

			this.calculeTotal();
		 },

		events: {

			'{addNew} click': function(){
				this.addRow();
			}

		}

	});

});