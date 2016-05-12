using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib.Mvc;
using zapweb.Models;

using Pillar.Mvc;

namespace zapweb.Mvc.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class CondominioController : zapweb.Lib.Mvc.Controller
    {        
        public string Add(Condominio condominio)
        {
            var rules = new CondominioRules();

            if (rules.Adicionar(condominio) == null)
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominio);
        }

        public string Update(Condominio condominio)
        {
            var rules = new CondominioRules();

            if (!rules.Update(condominio))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominio);
        }

        public string Get(int Id)
        {
            var rules = new CondominioRules();
            var condominio = rules.Get(Id);

            if (condominio == null)
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominio);
        }

        public string All(CondominioSearch param)
        {
            var rules = new CondominioRules();

            return this.Success(rules.Search(param));
        }

        public string Imprimir(string ids)
        {
            var rules = new CondominioRules();

            return this.Success(rules.Imprimir(ids));
        }

        public string Prospectos(int unidadeId)
        {
            var rules = new CondominioRules();
            var condominios = rules.Prospectos(unidadeId);

            if (condominios == null)
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominios);
        }

        public void UpdateVariaveis(Condominio condominio)
        {
            CondominioVariavelRepositorio.Update(condominio, condominio.Variaveis);
        }

        [ValidateInput(false)]
        public string EnviarDocumento(int Id, string assunto, string mensagem, string arquivoIds, string emails)
        {
            var rules = new CondominioRules();

            rules.EnviarDocumento(Id, assunto, mensagem, arquivoIds, emails);
            
            return Success(new { });
        }

        public void AddDocumento(int id, int documentoId, int arquivoId)
        {
            CondominioDocumentoRepositorio.Update(id, documentoId, arquivoId);
        }

        public string UpdateRank(Condominio condominio)
        {
            var rules = new CondominioRules();

            if (!rules.UpdateRank(condominio))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominio);
        }

        public string UpdateStatus(Condominio condominio)
        {
            var rules = new CondominioRules();

            if (!rules.UpdateStatus(condominio))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(condominio);
        }

        public void test(int condominioId, string arquivoIds)
        {
            var rules = new CondominioRules();
            var condominio = CondominioRepositorio.FetchOne(condominioId);
            var cos = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
            var central = UnidadeRepositorio.FetchOne(cos.GetUnidadeIdPai());
            var documentos = CondominioDocumentoRepositorio.FetchDocumentos(condominio);

            condominio.Unidade = cos;

            var arquivos = System.Text.RegularExpressions.Regex.Split(arquivoIds, ",");            

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
                    filename = rules.GerarDocumento(condominio, arquivo);
                    name = documento.Nome + ".pdf";
                }

                listFilename.Add(new Pillar.Util.FileEmail()
                {
                    Name = name,
                    Filename = filename
                });

            }
        }

    }
}