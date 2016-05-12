yum.define([
	PI.Url.create('Sindico', '/page/page.html'),
	PI.Url.create('Sindico', '/page/page.css')
], function (html) {

    Class('Sindico.Page').Extend(PI.Page).Body({

        instances: function () {
            this.view = new Mvc.View(html);

            this.nome = new UI.TextBox({
                placeholder: 'Nome do Síndico',
                dataModel: 'Nome'
            });

            this.apto = new UI.TextBox({
                placeholder: 'Numero',
                dataModel: 'Apto'
            });

            //endereco
            this.endereco = new Endereco.Painel({
                dataModel: 'Endereco'
            });
            
            this.email = new UI.TextBox({
                placeholder: 'Email',
                dataModel: 'Email'
            });

            this.telefone = new Telefone.Painel({
                dataModel: 'Telefones'
            });
            
            this.salvar = new UI.Button({
                label: 'Salvar',
                iconLeft: 'fa fa-check',
                classes: 'verde',
                style: {
                    'min-width': '120px'
                }
            });

            this.voltar = new UI.Button({
                label: 'Voltar',
                iconLeft: 'fa fa-arrow-circle-left',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });

			this.qs = PI.Url.Hash.getQueryJson();
            
            this.title = 'Sindico';
        },

        viewDidLoad: function () {
            
            if(this.qs.nome != undefined){
                this.nome.set( this.qs.nome );
            }
            
            this.base.viewDidLoad();
        },

        events: {

            '{salvar} click': function () {
                var self = this;
                
                this.saveModel( this.model ).ok(function (model) {
                    
                    if(self.qs.returnPage){
                        EventGlobal.trigger('sindico::save', model);
                        window.history.back();
                    }else{
                        PI.Url.Hash.to('!Sindico/Editar/' + model.Id);
                        Alert.info('Sucesso', 'Síndico adicionado com sucesso!');    
                    }                    
                    
                });
            },

            '{voltar} click': function () {
                window.history.back();
            }

        }

    });

});