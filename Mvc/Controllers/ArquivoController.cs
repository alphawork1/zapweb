using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using zapweb.Lib.Mvc;
using zapweb.Models;

using Pillar.Mvc;

namespace zapweb.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class ArquivoController : zapweb.Lib.Mvc.Controller
    {
        public string Add() {
            var arquivoRules = new ArquivoRules();
            var arquivo = arquivoRules.Adicionar(Request.Files[0]);

            if (arquivo == null) {
                return Error(arquivoRules.MessageError);
            }

            return Success(arquivo);
        }

        public string Remove(Arquivo arquivo) {
            var arquivoRules = new ArquivoRules();

            if (!arquivoRules.Remove(arquivo))
            {
                return Error(arquivoRules.MessageError);
            }

            return Success(arquivo);
        }

        public ActionResult Download(string hash)
        {
            var arquivoRules = new ArquivoRules();
            var arquivo = arquivoRules.GetByHash(hash);

            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = arquivo.Nome,
                Inline = true,
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());

            return File(Application.Path("/Public/files/" + arquivo.Hash), "application/force-download");
        }

        public ActionResult DownloadById(int arquivoId)
        {
            var arquivo = ArquivoRepositorio.FetchOne(arquivoId);
            var arquivoRules = new ArquivoRules();

            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = arquivo.Nome,
                Inline = true,
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());

            return File(Application.Path("/Public/files/" + arquivo.Hash), "application/force-download");
        }

        public FileResult Visualizar(string hash)
        {
            var arquivoRules = new ArquivoRules();
            var arquivo = arquivoRules.GetByHash(hash);

            return File(Application.Path("/Public/files/" + arquivo.Hash), arquivo.Tipo);
        }

        public ActionResult Thumb(string hash) {
            var arquivoRules = new ArquivoRules();
            var arquivo = arquivoRules.GetByHash(hash);

            return base.File(Application.Path("/Public/files/" + arquivo.Hash), arquivo.Tipo);
        }
    }
}
