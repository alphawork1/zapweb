using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib.Mvc;
using zapweb.Models;

namespace zapweb.Controllers
{
    
    public class UnidadeController : zapweb.Lib.Mvc.Controller
    {
        public string Add(Unidade unidade) {
            var unidadeRules = new UnidadeRules();

            if (!unidadeRules.Adicionar(unidade)) {
                return Error(unidadeRules.MessageError);
            }

            unidade.Usuarios = null;
            return Success(unidade);
        }

        public string Update(Unidade unidade) {
            var unidadeRules = new UnidadeRules();

            if (!unidadeRules.Update(unidade))
            {
                return Error(unidadeRules.MessageError);
            }

            unidade.Usuarios = null;
            return Success(unidade);
        }

        public string Get(int Id) {
            var unidadeRules = new UnidadeRules();
            var unidade = unidadeRules.Get(Id);

            if (unidade == null)
            {
                return Error(unidadeRules.MessageError);
            }

            return Success(unidade);
        }

        public string Search(string nome, UnidadeTipo tipo) {
            var unidadeRules = new UnidadeRules();

            return Success(unidadeRules.Search(nome, tipo));
        }

        public string All(int unidadeId) {
            var unidadeRules = new UnidadeRules();

            return Success(unidadeRules.Unidades(unidadeId));
        }

        public string Excluir(Unidade unidade)
        {
            var unidadeRules = new UnidadeRules();

            if (unidadeRules.Excluir(unidade))
            {
                return Error(unidadeRules.MessageError);
            }

            return Success(unidade);
        }
    }
}
