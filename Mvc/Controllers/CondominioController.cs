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

    }
}