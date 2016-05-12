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
    public class ReceitaRelatorioController : zapweb.Lib.Mvc.Controller
    {

        public string ReceitaUnidade(int unidadeId, int mes, int ano)
        {
            var receitaRules = new ReceitaRelatorioRules();
            var unidadeRules = new UnidadeRules();
            var unidade = unidadeRules.Get(unidadeId);
            var receita = receitaRules.ReceitaUnidade(unidade, mes, ano);

            if (receita == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(new
            {
                Unidade = unidade,
                Receita = receita
            });
        }

        public string ReceitaUnidadesPorCentral(int centralId, int mes, int ano)
        {
            var receitaRules = new ReceitaRelatorioRules();
            var unidadeRules = new UnidadeRules();
            var central = unidadeRules.Get(centralId);
            var receitas = receitaRules.ReceitasUnidadesFilhas(central, mes, ano);

            if (receitas == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(new
            {
                Central = central,
                Receitas = receitas
            });
        }

        public string ReceitasPorCentral(int mes, int ano)
        {
            var receitaRules = new ReceitaRelatorioRules();
            var receitas = receitaRules.ReceitasPorCentral(mes, ano);

            if (receitas == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(receitas);
        }

        public string TotalPorUnidade(int unidadeId, int mes, int ano)
        {
            var receitaRules = new ReceitaRelatorioRules();
            var total = receitaRules.TotalPorCentral(unidadeId, mes, ano);

            if (total == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(new
            {
                Total = total
            });
        }

        public string TotalPorCentral(int centralId, int mes, int ano) {
            var receitaRules = new ReceitaRelatorioRules();
            var total = receitaRules.TotalPorCentral(centralId, mes, ano);

            if (total == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(new { 
                Total = total
            });
        }

        public string TotalPorZap(int mes, int ano)
        {
            var receitaRules = new ReceitaRelatorioRules();
            var total = receitaRules.TotalPorZap(mes, ano);

            if (total == null)
            {
                return Error(receitaRules.MessageError);
            }

            return Success(new
            {
                Total = total
            });
        }
    }
}
