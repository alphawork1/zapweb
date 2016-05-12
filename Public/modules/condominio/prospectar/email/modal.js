yum.define([
    PI.Url.create('Condominio', '/prospectar/email/modal.html')    
], function(html){

    Class('Condominio.Prospectar.Email.Modal').Extend(UI.Modal).Body({

        instances: function(){
            this.view.inject({
                title: 'Lista de emails',
                body: html
            });
            
            this.emails = new UI.TextBox({
                placeholder: 'Informe outros destinatários',
                autosize: true
            });
                        
            this.assunto = new UI.TextBox();
            
			this.mensagem = new UI.RichText({
				dataModel: 'Mensagem',
				placeholder: 'Informe uma observação',
				autosize: true
			});
            
            this.enviar = new UI.Button({
                label: 'Enviar',
                iconLeft: 'fa fa-send',
                classes: 'cinza',
                style: {
                    'min-width': '120px'
                }
            });
            
            this.listEmail = [];
            
            this.__SEPARADORES__ = ['\n', ',', ';'];
        },
        
        viewDidLoad: function(){
            
            this.assunto.set('Modelos de avisos e comunicados para controle de pragas');
            this.mensagem.set('<p><strong>Prezado(a) Sindico(a):</strong></p><p>Nos sentimos honrados pela oportunidade de oferecer a voc&ecirc; e seu condom&iacute;nio servi&ccedil;os de alta qualidade, seguros e com garantia de satisfa&ccedil;&atilde;o, realizados por profissionais treinados em nosso pr&oacute;prio N&uacute;cleo de Ensino Operacional.</p><p>Segue <strong>(em anexo)</strong> nossa proposta acompanhada de modelo(s) de aviso(s) e comunicado(s) e <strong>(abaixo)</strong> colocamos algumas informa&ccedil;&otilde;es adicionais para um perfeito entendimento da campanha.</p><p><span style="color:#FF0000"><strong>O SERVI&Ccedil;O NA &Aacute;REA COMUM</strong></span></p><p>A &aacute;rea comum n&atilde;o ter&aacute; nenhum custo para o condom&iacute;nio<strong>&nbsp;(mediante autoriza&ccedil;&atilde;o de campanha, entrega de comunicados embaixo das portas, fixa&ccedil;&atilde;o de aviso nos elevadores e adjac&ecirc;ncias, bem como a realiza&ccedil;&atilde;o de contato direto com os moradores via interfone pelo nosso colaborador).</strong></p><p>&nbsp;</p><p><strong>SERVI&Ccedil;OS OFERECIDOS NA &Aacute;REA COMUM</strong>: I<strong>nsetos rasteiros</strong>&nbsp;(baratas, formigas e tra&ccedil;as),&nbsp;<strong>aracn&iacute;deos</strong>&nbsp;(aranhas e escorpi&otilde;es),&nbsp;<strong>Quil&oacute;podes e Dipl&oacute;podes</strong>&nbsp;(lacraias e piolho- de- cobra) e&nbsp;<strong>roedores</strong>&nbsp;(ratos, ratazanas e camundongos).</p><p><strong>A DESINSETIZA&Ccedil;&Atilde;O DA &Aacute;REA COMUM INCLUIR&Aacute;</strong>: Caixas de esgotos, caixas de gordura, caixas pluviais, fosso do elevador, escadas, halls, garagens, subsolo, escrit&oacute;rios, jardins, portaria, casa de m&aacute;quinas, telhados, &aacute;rea de lazer, sal&atilde;o de festa, etc.</p><p><span style="color:#FF0000"><strong>A DESINSETIZA&Ccedil;&Atilde;O NOS APARTAMENTOS</strong></span></p><p>Cada cond&ocirc;mino paga pelo servi&ccedil;o realizado de acordo com a(s) praga(s) que deseja combater (<strong>valor personalizado</strong>) - &nbsp;<strong>Durante a campanha os moradores ter&atilde;o um Desconto Especial nos servi&ccedil;os.</strong></p><p><strong>&nbsp;</strong></p><p><span style="color:#FF0000"><strong>GAT &ndash; GARANTIA DE ASSIST&Ecirc;NCIA T&Eacute;CNICA</strong></span></p><p><strong>Continuada pelo per&iacute;odo de 6 meses consecutivos, reiniciando em uma nova campanha semestral.</strong></p><p>&nbsp;</p><p>Caso concorde e aprove o material, providenciaremos a impress&atilde;o imediata dos comunicados e avisos e nosso representante em sua cidade far&aacute; a entrega dos mesmos.</p><p><strong>Desde j&aacute; agradecemos e nos colocamos a sua disposi&ccedil;&atilde;o para iniciarmos a campanha j&aacute; na&nbsp;data prevista nos modelos.</strong></p><p><strong>&nbsp;</strong></p><p>D&uacute;vidas, ligue-nos</p><p><strong>&nbsp;</strong></p><p><strong>Atenciosamente,</strong></p>');
            
            this.popule( this.condominio );
            
            this.base.viewDidLoad();
        },
        
        pushEmail: function(email, emails){         
            if(email != undefined && email.length > 0){
                emails.push( '<span class="condominio-prospectar-email-tag">' + email + '</span>' );
                this.listEmail.push( email );
            }
        },
        
        popule: function(condominio){
            var emails = [];
            
            this.pushEmail(condominio.Sindico.Email, emails);
            this.pushEmail(condominio.Zelador.Email, emails);
            this.pushEmail(condominio.Administradora.Email, emails);
            
            // this.emails.set( this.joinEmails( emails ) );
            this.view.destinatarios.html( emails.join(' ') );
        },
        
        splitEmails: function(emails){
            
            for(var i in this.__SEPARADORES__){
                if(emails.indexOf( this.__SEPARADORES__[i] ) > 0){
                    return emails.split( this.__SEPARADORES__[i] );
                }
            }
            
            return [emails];                  
        },
        
        joinEmails: function(emails){
            return emails.join( this.__SEPARADORES__[0] );
        },
        
        events: {
        
            '{enviar} click': function(){
                var self = this;
                var emails = this.emails.get();
                var list = this.splitEmails( emails ).concat( this.listEmail );
                var assunto = this.assunto.get();
                var mensagem = this.mensagem.get();
                
                if(list.length == 0){
                    Alert.error('Aviso', 'Informe ao menos um email que irá receber os documentos');
                    return;
                }
                
                if(assunto.length == 0){
                    Alert.error('Aviso', 'Informe o assunto do email');
                    return;
                }
                                
                this.enviar.setLabel('Enviando...').anime(true).lock();
                
                this.event.trigger('enviar', assunto, mensagem.replace(/\n/gi, '<br>'), list.join(','));
            }
        }

    });

});