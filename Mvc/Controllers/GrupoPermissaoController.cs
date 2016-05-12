using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib.Mvc;
using zapweb.Models;

namespace zapweb.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class GrupoPermissaoController : zapweb.Lib.Mvc.Controller
    {
        public string Add(GrupoPermissao grupo) {
            var grupoRules = new GrupoPermisaoRules();

            if (!grupoRules.Adicionar(grupo)) {
                return Error(grupoRules.MessageError);
            }

            return Success(grupo);
        }

        public string Update(GrupoPermissao grupo)
        {
            var grupoRules = new GrupoPermisaoRules();

            if (!grupoRules.Update(grupo))
            {
                return Error(grupoRules.MessageError);
            }

            return Success(grupo);
        }

        public string Remove(GrupoPermissao grupo) {
            var grupoRules = new GrupoPermisaoRules();

            if (!grupoRules.Remove(grupo))
            {
                return Error(grupoRules.MessageError);
            }

            return Success(grupo);
        }

        public string addPermissoes(GrupoPermissao grupo) {
            var grupoRules = new GrupoPermisaoRules();

            if (!grupoRules.AddPermissoes(grupo))
            {
                return Error(grupoRules.MessageError);
            }

            return Success(grupo);
        }

        public string All() {
            var rules = new GrupoPermisaoRules();             

            return this.Success(rules.All());
        }
    }
}
