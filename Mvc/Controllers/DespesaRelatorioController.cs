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
    public class DespesaRelatorioController : zapweb.Lib.Mvc.Controller
    {
        public string RelatorioUnidade(int unidadeId, int mes, int ano)
        {
            var despesaRules = new DespesaRelatorioRules();
            var relatorio = despesaRules.RelatorioByUnidade(unidadeId, mes, ano);

            if (relatorio == null)
            {
                return Error(despesaRules.MessageError);
            }
            
            var unidade = UnidadeRepositorio.FetchOne(unidadeId);

            return Success(new
            {
                Unidade = unidade,
                Dados = relatorio
            });
        }

        public string RelatorioCentral(int centralId, int mes, int ano)
        {
            var despesaRules = new DespesaRelatorioRules();
            var relatorio = despesaRules.RelatorioByCentral(centralId, mes, ano);

            if (relatorio == null)
            {
                return Error(despesaRules.MessageError);
            }
            
            var unidade = UnidadeRepositorio.FetchOne(centralId);

            return Success(new
            {
                Unidade = unidade,
                Dados = relatorio
            });
        }

        public string RelatorioZap(int mes, int ano)
        {
            var despesaRules = new DespesaRelatorioRules();
            var relatorio = despesaRules.RelatorioByZap(mes, ano);

            if (relatorio == null)
            {
                return Error(despesaRules.MessageError);
            }

            return Success(new
            {            
                Dados = relatorio
            });
        }

    }
}
