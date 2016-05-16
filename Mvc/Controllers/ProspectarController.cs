using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;
using zapweb.Models;

using Pillar.Mvc;

namespace zapweb.Mvc.Controllers
{
    public class ProspectarController : zapweb.Lib.Mvc.Controller
    {
        
        public string Enviar(ProspectarEmail email)
        {
            var rules = new ProspectarRules();

            rules.EnviarEmail(email.CondominioId, email.Assunto, email.Mensagem, email.Arquivos, email.Emails);

            return Success(new { });
        }

        public void test(int condominioId, string arquivoIds)
        {
            var rules = new ProspectarRules();
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