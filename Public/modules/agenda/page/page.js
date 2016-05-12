yum.define([
	PI.Url.create('Agenda', '/page/page.html'),
	PI.Url.create('Agenda', '/page/page.css'),
	PI.Url.create('Agenda', '/model.js')
], function(html){

	Class('Agenda.Page').Extend(PI.Page).Body({

		instances: function(){
			this.view = new Mvc.View(html);
			
			this.title = 'Agenda';
			
            this.statusbar = new UI.StatusStripBar();
			
			this.unidadeLabel = new UI.StatusStrip.Label({
                label: 'Unidade',
                position: 'right'
            });
			
			this.addLabel = new UI.StatusStrip.Label({
                label: 'Adicionar Compromisso',
                position: 'right'
            });

			this.voltar = new UI.Button();
			
			this.unidade = Unidade.Current;
			
			this.model = new Agenda.Model();
		},
		
		init: function(){
			this.base.init();
			
			this.calendar = new UI.Calendar({
				viewMode: this.viewMode
			});
		},
		
		viewDidLoad: function(){
			this.base.viewDidLoad();
			
			this.statusbar.add(this.unidadeLabel);
            this.statusbar.add(new UI.StatusStrip.Separator({ position: 'right' }));
			this.statusbar.add(this.addLabel);
			
			this.calendar.refresh();
		},

        showPopupSelectUnidade: function(){
            var self = this;
            var modal = new Unidade.Modal({
                tipoUnidade: this.tipoUnidade
            });

            modal.render( this.view.element );

            modal.open();

            modal.event.listen('select', function(unidade){
                self.refreshUnidade(unidade);
            });
        },
		
		refreshUnidade: function(unidade){
			this.unidade = unidade;
			this.calendar.refresh();
		},
		
		events: {
		
			'{calendar} refresh': function(start, end, cb){
				
				this.unidadeLabel.set( this.unidade.Nome );
				
				this.model.feed(start.format(), end.format(), this.unidade.Id).ok(function(items){
					var arr = [];
					
					for (var i = 0; i < items.length; i++) {
						arr.push({
							id: items[i].Id,
							title: items[i].Descricao,
							description: items[i].Descricao,
							start: items[i].Data,
							end: items[i].DataFinal,
							url: items[i].Url,
							model: items[i]
						});
					}
					
					cb(arr);
				});
			},
			
			'{calendar} update::datetime': function(event){
				if(event.model.Tipo == Agenda.Tipo.HISTORICO){					
					Condominio.Historico.Model.create({
						Id: event.id,
						ProximoContato: event.start.format('DD/MM/YYYY hh:mm:ss') 
					}).updateDate();
				}
			},

            '{unidadeLabel} click': function(){
                this.showPopupSelectUnidade();
            }
		}

	});

});