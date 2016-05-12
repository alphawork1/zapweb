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
    public class CentroCustoController : zapweb.Lib.Mvc.Controller
    {

        public string Add(CentroCusto centroCusto) {
            var centroCustoRules = new CentroCustoRules();

            if (!centroCustoRules.Adicionar(centroCusto)) {
                return Error(centroCustoRules.MessageError);
            }

            return Success(centroCusto);
        }

        public string Update(CentroCusto centroCusto)
        {
            var centroCustoRules = new CentroCustoRules();

            if (!centroCustoRules.Update(centroCusto))
            {
                return Error(centroCustoRules.MessageError);
            }

            return Success(centroCusto);
        }

        public string Excluir(CentroCusto centroCusto)
        {
            var centroCustoRules = new CentroCustoRules();

            if (!centroCustoRules.Excluir(centroCusto))
            {
                return Error(centroCustoRules.MessageError);
            }

            return Success(centroCusto);
        }

        public string All(TipoCentroCusto tipo)
        {
            var centroCustoRules = new CentroCustoRules();

            return Success(centroCustoRules.Tipo(tipo));
        }

    }
}
