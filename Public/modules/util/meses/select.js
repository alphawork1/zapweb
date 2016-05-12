yum.define([

], function(html){

	Class('Util.Meses.Select').Extend(Mvc.Component).Body({

		instances: function(){
			this.view = new Mvc.View('<div> <div at="select"></div>  </div>');

			this.select = new UI.SelectionBox({
				label: 'Selecione Mês'
			});
		},

		viewDidLoad: function(){
			var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
			var indexCurrentMes = Lib.DataTime.Now().getIndexMes();

			for(var i = 0 ; i < meses.length ; i++){
			   var mes = meses[i];

				this.select.add(new UI.Selection.Item({ id: i, label: mes, showMenu: false }));
			}

			this.set( indexCurrentMes );

		    this.base.viewDidLoad();
		},

		get: function(){
		    return this.select.get().id;
		 },

		set: function(id){
		    this.select.set(function(item){
			    return item.id == id || item.label == id;
		    });
		 }

	}); 

});