yum.define([
    PI.Url.create('Util', '/relatorio/page/page.html'),
    PI.Url.create('Util', '/relatorio/page/page.css'),
    PI.Url.create('Util', '/relatorio/popup.mes/popup.js'),
    PI.Url.create('Util', '/relatorio/popup.ano/popup.js'),
    PI.Url.create('Unidade', '/modal/modal.js')
], function (html) {

    Class('Util.Relatorio.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nomeRelatorio = 'Relatório';

            this.statusBar = new UI.StatusStripBar();

            this.stripMes = new UI.StatusStrip.Label({
                label: Lib.DataTime.CurrentMes(),
                position: 'right'
            });

            this.stripAno = new UI.StatusStrip.Label({
                label: Lib.DataTime.CurrentAno(),
                position: 'right'
            });

            this.print = new UI.StatusStrip.Label({
                iconLeft: 'fa fa-print',
                label: 'Imprimir',
                position: 'right' 
            });

            this.unidade = new UI.StatusStrip.Label({
                label: 'Unidade',
                position: 'right'
            });
            
            this.voltar = new UI.Button();

            this.popupMes = new Util.Relatorio.PopupMes();
            this.popupAno = new Util.Relatorio.PopupAno();
            
            this.title = 'Relatório';
        },

        viewDidLoad: function () {
            var self = this;

            this.view.nomeUsuario.html( PI.String.firstAndlastWord( Usuario.Current.Nome ) );
            this.view.nomeUnidadeCurrent.html( Unidade.Current.Nome );
            this.view.datahora.html( Lib.DataTime.Now().getDateStringFromFormat('dd/MM/yyyy hh:mm') );
            // this.view.nomeRelatorio.html( this.nomeRelatorio );
            this.view.logo.attr('src',  PI.Url.create('Logo').getUrl() );
            
            this.statusBar.add(this.stripAno);
            this.statusBar.add(new UI.StatusStrip.Separator({ position: 'right' }));
            this.statusBar.add(this.stripMes);
            this.statusBar.add(new UI.StatusStrip.Separator({ position: 'right' }));
            this.statusBar.add(this.unidade);
            this.statusBar.add(new UI.StatusStrip.Separator({ position: 'right' }));
            this.statusBar.add(this.print);

            this.popupMes.showOnClick(this.stripMes);
            this.popupAno.showOnClick(this.stripAno);

            this.setMes( this.mes );
            this.setAno( this.ano );

            if (Unidade.Current.Tipo == Unidade.Tipo.ZAP) {
                this.view.labelZap.show();
                this.view.nomeUnidadeCurrent.hide();
            }else{
                this.view.labelZap.hide();
                this.view.nomeUnidadeCurrent.show();
            }

            if (this.unidadeId == 0) setTimeout(function(){
                self.showPopupSelectUnidade();
            }, 500);

            this.base.viewDidLoad();
        },

        setNomeRelatorio: function(nome){
            this.view.nomeRelatorio.html(nome);
        },
        
        setNomeUnidade: function(nome){
            this.view.nomeUnidade.html(nome);
        },

        setMes: function(mes){
            this.stripMes.set( Lib.DataTime.ConvertIndexToMes( mes ) );
            this.view.mes.html( Lib.DataTime.ConvertIndexToMes( mes ) );
        },

        getMes: function(){
            return Lib.DataTime.ConvertMesToIndex( this.stripMes.get() );
        },

        setAno: function(ano){
            this.stripAno.set(ano);
            this.view.ano.html( ano );
        },

        getAno: function(){
            return this.stripAno.get();
        },

        showPopupSelectUnidade: function(){
            var self = this;
            var modal = new Unidade.Modal({
                tipoUnidade: this.tipoUnidade
            });

            modal.render( this.view.modal );

            modal.open();

            modal.event.listen('select', function(unidade){
                self.event.trigger('select::unidade', unidade);
            });
        },

        events: {

            '{popupMes} click': function(mes){
                this.setMes( Lib.DataTime.ConvertMesToIndex(mes) );
                this.event.trigger('change::mes', mes);
            },

            '{popupAno} click': function(ano){
                this.setAno(ano);
                this.event.trigger('change::ano', ano);
            },

            '{unidade} click': function(){
                this.showPopupSelectUnidade();
            },

            '{print} click': function(){
                window.print();
            }
        }

    });

});