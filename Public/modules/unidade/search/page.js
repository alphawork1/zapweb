yum.define([
	PI.Url.create('Unidade', '/search/page.html'),
	PI.Url.create('Unidade', '/search/page.css'),
    PI.Url.create('Unidade', '/table/table.js'),
    PI.Url.create('Lib.TableFilter', '/tablefilter.js')
], function (html) {

    Class('Unidade.Search.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.search = new UI.TextBox({
                placeholder: 'Pesquisar'
            });

            this.table = new Unidade.Table({
                messageEmpty: 'Aguarde ...',
                columns: ['editar']
            });
            
            this.title = 'Pesquisar Unidade';
            
            this.voltar = new UI.Button();
        },

        viewDidLoad: function () {
            app.home.setTitle('Pesquisar Unidade');

            this.loadAndFill();

            this.base.viewDidLoad();
        },

        loadAndFill: function () {
            var self = this;

            Unidade.Model.create().all(Unidade.Current.Id).ok(function (unidades) {
                for (var i in unidades) {
                    self.table.add(unidades[i]);
                }

                if (unidades.length == 0) {
                    self.table.view.empty.html('Nenhuma unidade encontrada');
                } else {
                    self.table.view.empty.remove();
                }
                
            });
        },

        events: {

            '{search} keyup': function () {
                $.TableFilter(this.table.view.table, this.search.get());
            }

        }

    });

});