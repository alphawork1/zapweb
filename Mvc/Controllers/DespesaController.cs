using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using zapweb.Lib.Mvc;
using zapweb.Models;

using Pillar.Mvc;
using Pillar.Util;

namespace zapweb.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class DespesaController : zapweb.Lib.Mvc.Controller
    {
        public string Add(Despesa despesa) {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Adicionar(despesa)) {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Update(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Update(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Excluir(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Delete(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Remeter(Despesa despesa) {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Remeter(despesa)) {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Pagar(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Pagar(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string NaoPagar(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.NaoPagar(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Autorizar(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.Autorizar(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string NaoAutorizar(Despesa despesa)
        {
            var despesaRules = new DespesaRules();

            if (!despesaRules.NaoAutorizar(despesa))
            {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Get(int Id) {
            var despesaRules = new DespesaRules();
            var despesa = despesaRules.Get(Id);

            if (despesa == null) {
                return Error(despesaRules.MessageError);
            }

            return Success(despesa);
        }

        public string Pesquisar(DespesaPesquisa parametrosPesquisa, int totalPerPage, int page) {
            var despesaRules = new DespesaRules();
            var paging = new Paging(){
                totalPerPage = totalPerPage,
                page = page
            };

            return Success(despesaRules.Pesquisar(parametrosPesquisa, paging), paging);
        }
    }
}
