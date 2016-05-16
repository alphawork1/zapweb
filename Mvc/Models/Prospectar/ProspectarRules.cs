using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class ProspectarRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public void EnviarEmail(int condominioId, string assunto, string mensagem, string arquivoIds, string emails)
        {
            var condominio = CondominioRepositorio.FetchOne(condominioId);
            var cos = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
            var central = UnidadeRepositorio.FetchOne(cos.GetUnidadeIdPai());
            var documentos = CondominioDocumentoRepositorio.FetchDocumentos(condominio);

            condominio.Unidade = cos;

            var arquivos = System.Text.RegularExpressions.Regex.Split(arquivoIds, ",");
            var listEmails = System.Text.RegularExpressions.Regex.Split(emails, ",");

            List<Pillar.Util.FileEmail> listFilename = new List<Pillar.Util.FileEmail>();

            foreach (var arquivoId in arquivos)
            {
                var __arquivoId = int.Parse(arquivoId);
                var documento = documentos.Find(d => d.ArquivoId == __arquivoId);
                var arquivo = documento.Arquivo;

                var filename = Pillar.Mvc.Application.Path("/Public/files/" + arquivo.Hash);
                var name = arquivo.Nome + "." + zapweb.Lib.File.GetExtensionByTipo(arquivo.Tipo);

                // se for arquivo for do word converte para pdf
                if (arquivo.Tipo.IndexOf("word") > 0)
                {
                    filename = this.GerarDocumento(condominio, arquivo);
                    name = documento.Nome + ".pdf";
                }

                listFilename.Add(new Pillar.Util.FileEmail()
                {
                    Name = name,
                    Filename = filename
                });

            }

            var email = new Pillar.Util.SendEmail("smtp.gmail.com", "587", "zaapweb@gmail.com", "@zapweb1");
            foreach (var e in listEmails)
            {
                var _email = e.Trim();
                if (_email.Length > 0)
                {
                    email.Send("Zap Pragas", "zaapweb@gmail.com", _email, assunto, mensagem, listFilename);
                }                
            }

            if (cos.EmailRemetente.Length > 0)
            {
                // copia para o cos
                email.Send("Zap Pragas", "zaapweb@gmail.com", cos.EmailRemetente, assunto, mensagem, listFilename);
            }

            if (central.EmailRemetente.Length > 0)
            {
                // copia para a central
                email.Send("Zap Pragas", "zaapweb@gmail.com", central.EmailRemetente, assunto, mensagem, listFilename);
            }            
        }

        private string UppercaseFirst(string s)
        {
            // Check for empty string.
            if (string.IsNullOrEmpty(s))
            {
                return string.Empty;
            }
            // Return char and concat substring.
            return char.ToUpper(s[0]) + s.Substring(1);
        }

        public string GerarDocumento(Condominio condominio, Arquivo arquivo)
        {
            var filename = Pillar.Mvc.Application.Path("/Public/files/" + arquivo.Hash);
            var filenameCopy = zapweb.Lib.File.Create(".docx");
            var filenamePdf = zapweb.Lib.File.Create(".pdf");

            System.IO.File.Copy(filename, filenameCopy, true);

            var word = new zapweb.Lib.Word(filenameCopy);
            var keywords = new Dictionary<string, string>();
            var content = word.GetContent();
            var footer = word.GetFooter();

            var variaveis = CondominioVariavelRepositorio.FetchVariaveis(condominio);

            foreach (var v in variaveis)
            {
                if (v.Tipo != VariavelTipo.FORMULA)
                {
                    if (v.Tipo == VariavelTipo.DATA)
                    {
                        var d = v.Valor.Split('/');
                        if (d.Length == 3)
                        {
                            var dateTime = new DateTime(int.Parse(d[2]), int.Parse(d[1]), int.Parse(d[0]));
                            var tt = v.Underscore.Substring(0, v.Underscore.Length - 2);
                            keywords.Add(tt + "_DIA__", dateTime.ToString("dd"));
                            keywords.Add(tt + "_MES__", dateTime.ToString("MM"));
                            keywords.Add(tt + "_ANO__", dateTime.ToString("yyyy"));
                            keywords.Add(tt + "_NOME_MES__", UppercaseFirst(dateTime.ToString("MMMM")));
                        }

                        keywords.Add(v.Underscore, v.Valor);
                    }
                    else
                    {
                        keywords.Add(v.Underscore, v.Valor);
                    }
                }
            }

            System.Data.DataTable dt = new System.Data.DataTable();

            foreach (var v in variaveis)
            {
                if (v.Tipo == VariavelTipo.FORMULA)
                {
                    var formula = this.ConvertToNumber(Pillar.Util.Template.Inject(v.Valor, keywords));
                    var value = float.Parse(dt.Compute(formula, "").ToString());

                    keywords.Add(v.Underscore, value.ToString("0.0,0"));
                }
            }

            // injeta endereco condominio            
            keywords.Add("__COND_NOME__", condominio.Nome);
            keywords.Add("__COND_NOME_MAIUSCULO__", condominio.Nome.ToUpper());
            keywords.Add("__COND_QUANTIDADE_ANDARES_POR_BLOCO__", condominio.QuantidadeAndaresBloco.ToString());
            keywords.Add("__COND_QUANTIDADE_APTO__", condominio.QuantidadeApto.ToString());
            keywords.Add("__COND_QUANTIDADE_BLOCOS__", condominio.QuantidadeBlocos.ToString());

            var endereco = EnderecoRepositorio.FetchOne(condominio.EnderecoId);
            keywords.Add("__COND_ENDERECO_RUA__", endereco.Rua);
            keywords.Add("__COND_ENDERECO_NUMERO__", endereco.Numero);
            keywords.Add("__COND_ENDERECO_BAIRRO__", endereco.Bairro);
            keywords.Add("__COND_ENDERECO_CEP__", endereco.Cep);
            if (endereco.Cidade != null)
            {
                keywords.Add("__COND_ENDERECO_CIDADE__", endereco.Cidade.Nome);
                keywords.Add("__COND_ENDERECO_ESTADO__", endereco.Cidade.Estado);
            }
            else
            {
                keywords.Add("__COND_ENDERECO_CIDADE__", "");
                keywords.Add("__COND_ENDERECO_ESTADO__", "");
            }

            // injeta data/hora
            keywords.Add("__HOJE_HORARIO__", DateTime.Now.ToString("HH:mm"));
            keywords.Add("__HOJE_DIA__", DateTime.Now.ToString("dd"));
            keywords.Add("__HOJE_MES__", DateTime.Now.ToString("MM"));
            keywords.Add("__HOJE_ANO__", DateTime.Now.ToString("yyyy"));
            keywords.Add("__HOJE_DATA__", DateTime.Now.Year.ToString("dd/MM/yyyy"));
            keywords.Add("__HOJE_NOME_MES__", UppercaseFirst(DateTime.Now.ToString("MMMM")));

            // injetar cos
            var cos = condominio.Unidade;
            keywords.Add("__COS_NOME__", cos.Nome);
            keywords.Add("__COS_ENDERECO__", cos.Endereco);

            // injeta responsavel pelo cos
            var responsavelCos = UsuarioRepositorio.FetchResponsavel(cos);
            if (responsavelCos != null)
            {
                keywords.Add("__COS_NOME_RESPONSAVEL__", responsavelCos.Nome);
                keywords.Add("__COS_APELIDO_RESPONSAVEL__", responsavelCos.Apelido);
                keywords.Add("__COS_TRATAMENTO_RESPONSAVEL__", responsavelCos.Tratamento);

                var responsavelCosTelefones = UsuarioTelefoneRepositorio.FetchTelefones(responsavelCos);
                if (responsavelCosTelefones != null && responsavelCosTelefones.Count > 0)
                {
                    var telefone = responsavelCosTelefones.Find(t => t.Tipo == TipoTelefone.FIXO);
                    if (telefone != null)
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_FIXO__", telefone.Numero);
                    }
                    else
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_FIXO__", "");
                    }

                    telefone = responsavelCosTelefones.Find(t => t.Tipo == TipoTelefone.Comercial);
                    if (telefone != null)
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_COMERCIAL__", telefone.Numero);
                    }
                    else
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_COMERCIAL__", "");
                    }

                    telefone = responsavelCosTelefones.Find(t => t.Tipo == TipoTelefone.Celular);
                    if (telefone != null)
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_CELULAR__", telefone.Numero);
                    }
                    else
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_CELULAR__", "");
                    }

                    telefone = responsavelCosTelefones.Find(t => t.Tipo == TipoTelefone.Whatsapp);
                    if (telefone != null)
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_WHATSAPP__", telefone.Numero);
                    }
                    else
                    {
                        keywords.Add("__COS_RESPONSAVEL_TELEFONE_WHATSAPP__", "");
                    }
                }
                else
                {
                    keywords.Add("__COS_RESPONSAVEL_TELEFONE_FIXO__", "");
                    keywords.Add("__COS_RESPONSAVEL_TELEFONE_COMERCIAL__", "");
                    keywords.Add("__COS_RESPONSAVEL_TELEFONE_CELULAR__", "");
                    keywords.Add("__COS_RESPONSAVEL_TELEFONE_WHATSAPP__", "");
                }
            }
            else
            {
                keywords.Add("__COS_NOME_RESPONSAVEL__", "");
                keywords.Add("__COS_APELIDO_RESPONSAVEL__", "");
                keywords.Add("__COS_TRATAMENTO_RESPONSAVEL__", "");
                keywords.Add("__COS_RESPONSAVEL_TELEFONE_FIXO__", "");
                keywords.Add("__COS_RESPONSAVEL_TELEFONE_COMERCIAL__", "");
                keywords.Add("__COS_RESPONSAVEL_TELEFONE_CELULAR__", "");
                keywords.Add("__COS_RESPONSAVEL_TELEFONE_WHATSAPP__", "");
            }

            // injeta cidade do cos
            var cidade = CidadeRepositorio.FetchOne(cos.CidadeId);
            if (cidade != null)
            {
                keywords.Add("__COS_CIDADE__", cidade.Nome);
                keywords.Add("__COS_ESTADO__", cidade.Estado);
            }
            else
            {
                keywords.Add("__COS_CIDADE__", "");
                keywords.Add("__COS_ESTADO__", "");
            }

            // injeta os telefones do cos
            var telefones = UnidadeTelefoneRepositorio.FetchTelefones(cos);
            if (telefones != null && telefones.Count > 0)
            {
                var telefone = telefones.Find(t => t.Tipo == TipoTelefone.FIXO);
                if (telefone != null)
                {
                    keywords.Add("__COS_TELEFONE_FIXO__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__COS_TELEFONE_FIXO__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Comercial);
                if (telefone != null)
                {
                    keywords.Add("__COS_TELEFONE_COMERCIAL__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__COS_TELEFONE_COMERCIAL__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Celular);
                if (telefone != null)
                {
                    keywords.Add("__COS_TELEFONE_CELULAR__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__COS_TELEFONE_CELULAR__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Whatsapp);
                if (telefone != null)
                {
                    keywords.Add("__COS_TELEFONE_WHATSAPP__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__COS_TELEFONE_WHATSAPP__", "");
                }

            }
            else
            {
                keywords.Add("__COS_TELEFONE_FIXO__", "");
                keywords.Add("__COS_TELEFONE_COMERCIAL__", "");
                keywords.Add("__COS_TELEFONE_CELULAR__", "");
                keywords.Add("__COS_TELEFONE_WHATSAPP__", "");
            }

            // injetar sindico
            var sindico = ContatoRepositorio.FetchOne(condominio.SindicoId);
            if (sindico != null)
            {
                keywords.Add("__SINDICO_NOME__", sindico.Nome);
            }
            else
            {
                keywords.Add("__SINDICO_NOME__", "");
            }

            // injetar zap
            var zap = UnidadeRepositorio.FetchZapUnidade();
            telefones = UnidadeTelefoneRepositorio.FetchTelefones(zap);
            if (telefones != null && telefones.Count > 0)
            {
                var telefone = telefones.Find(t => t.Tipo == TipoTelefone.FIXO);
                if (telefone != null)
                {
                    keywords.Add("__ZAP_TELEFONE_FIXO__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__ZAP_TELEFONE_FIXO__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Comercial);
                if (telefone != null)
                {
                    keywords.Add("__ZAP_TELEFONE_COMERCIAL__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__ZAP_TELEFONE_COMERCIAL__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Celular);
                if (telefone != null)
                {
                    keywords.Add("__ZAP_TELEFONE_CELULAR__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__ZAP_TELEFONE_CELULAR__", "");
                }

                telefone = telefones.Find(t => t.Tipo == TipoTelefone.Whatsapp);
                if (telefone != null)
                {
                    keywords.Add("__ZAP_TELEFONE_WHATSAPP__", telefone.Numero);
                }
                else
                {
                    keywords.Add("__ZAP_TELEFONE_WHATSAPP__", "");
                }

            }
            else
            {
                keywords.Add("__ZAP_TELEFONE_FIXO__", "");
                keywords.Add("__ZAP_TELEFONE_COMERCIAL__", "");
                keywords.Add("__ZAP_TELEFONE_CELULAR__", "");
                keywords.Add("__ZAP_TELEFONE_WHATSAPP__", "");
            }

            // injetar administradora
            var administradora = AdministradoraRepositorio.FetchOne(condominio.AdministradoraId);
            if (administradora != null)
            {
                keywords.Add("__ADMINISTRADORA_NOME__", administradora.Nome);
            }
            else
            {
                keywords.Add("__ADMINISTRADORA_NOME__", "");
            }

            var xmlReferencias = System.IO.File.ReadAllText(Pillar.Mvc.Application.AppData("referencias.txt"));
            var view = "";
            var referencias = CondominioRepositorio.FetchReferencias(cos);
            foreach (var cond in referencias)
            {
                var referencia = "__REF_COND_";
                var kw = new Dictionary<string, string>();
                cond.Sindico = ContatoRepositorio.FetchOne(cond.SindicoId);
                cond.Endereco = EnderecoRepositorio.FetchOne(cond.EnderecoId);

                kw.Add(referencia + "NOME__", cond.Nome);
                if (cond.Sindico != null) kw.Add(referencia + "SINDICO_NOME__", cond.Sindico.Nome);
                if (cond.Endereco != null) kw.Add(referencia + "ENDERECO__", cond.Endereco.ToString());
                kw.Add(referencia + "TELEFONES__", cond.TelefonePortaria);

                view += Pillar.Util.Template.Inject(xmlReferencias, kw);
            }

            keywords.Add("__REFERENCIAS__", view);

            for (var i = 0; i < 5; i++)
            {
                var referencia = "__REF_COND_" + (i + 1) + "_";

                if (referencias.Count > i)
                {
                    referencias[i].Sindico = ContatoRepositorio.FetchOne(referencias[i].SindicoId);
                    referencias[i].Endereco = EnderecoRepositorio.FetchOne(referencias[i].EnderecoId);

                    keywords.Add(referencia + "NOME__", referencias[i].Nome);
                    if (referencias[i].Sindico != null) keywords.Add(referencia + "SINDICO_NOME__", referencias[i].Sindico.Nome);
                    if (referencias[i].Endereco != null) keywords.Add(referencia + "ENDERECO__", referencias[i].Endereco.ToString());
                    keywords.Add(referencia + "TELEFONES__", referencias[i].TelefonePortaria);
                }
                else
                {
                    keywords.Add(referencia + "NOME__", "");
                    keywords.Add(referencia + "SINDICO_NOME__", "");
                    keywords.Add(referencia + "ENDERECO__", "");
                    keywords.Add(referencia + "TELEFONES__", "");
                }

            }

            word.SetContent(Pillar.Util.Template.Inject(content, keywords));
            word.SetFooter(Pillar.Util.Template.Inject(footer, keywords));

            word.ConvertToPDF(filenamePdf);

            //System.IO.File.Delete(filenameCopy);

            return filenamePdf;
        }

        private string ConvertToNumber(string str)
        {
            str = str.Replace("R$", "");
            str = str.Replace(" ", "");
            str = str.Replace(".", "");
            str = str.Replace(",", ".");

            return str;
        }

    }
}