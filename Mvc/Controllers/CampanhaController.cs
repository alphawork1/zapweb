using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class CampanhaController : zapweb.Lib.Mvc.Controller
    {

        public string Add(Campanha campanha)
        {
            var rules = new CampanhaRules();

            if (!rules.Adicionar(campanha))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(campanha);
        }

        public string Update(Campanha campanha)
        {
            var rules = new CampanhaRules();

            if (!rules.Update(campanha))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(campanha);
        }

        public string All(int condominioId)
        {
            var rules = new CampanhaRules();

            return this.Success(rules.All(condominioId));
        }

        public string Get(int Id)
        {
            var rules = new CampanhaRules();
            var campanha = rules.Get(Id);

            if(campanha == null)
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(campanha);
        }

        public string Excluir(Campanha campanha)
        {
            var rules = new CampanhaRules();

            if (!rules.Excluir(campanha))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(campanha);
        }

        public ActionResult Download(int campanhaId, string nome, string hash)
        {
            var rules = new CampanhaRules();
            var filename = rules.GetPdfFilename(campanhaId, hash);
            
            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = nome + ".pdf",
                Inline = true,
            };

            Response.AppendHeader("Content-Disposition", cd.ToString());

            return File(filename, "application/force-download");
        }

    }
}