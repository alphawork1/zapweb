yum.define([
	PI.Url.create('Usuario', '/search/page.html'),
	PI.Url.create('Usuario', '/search/page.css'),
    PI.Url.create('Usuario', '/table/table.js'),
    PI.Url.create('Lib.TableFilter', '/tablefilter.js')
], function (html) {

    Class('Usuario.Search.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.search1 = new UI.TextBox({
                placeholder: 'Pesquisar'
            });

            this.table = new Usuario.Table({
                messageEmpty: 'Aguarde ...',
                columns: ['editar']
            });

            this.model = new Usuario.Model();
            
            this.title = 'Pesquisar Usuário';
            
            this.voltar = new UI.Button();
        },

        viewDidLoad: function () {
            app.home.setTitle('Pesquisar Usuário');

            this.loadAndFill();

            this.base.viewDidLoad();
        },

        loadAndFill: function () {
            var self = this;

            this.model.all(Unidade.Current.Id).ok(function (usuarios) {
                for (var i in usuarios) {
                    self.table.add(usuarios[i]);
                }

                self.table.view.empty.remove();
            });
        },

        events: {

            '{search1} keyup': function () {
                $.TableFilter(this.table.view.table, this.search1.get());
            }

        }

    });

});