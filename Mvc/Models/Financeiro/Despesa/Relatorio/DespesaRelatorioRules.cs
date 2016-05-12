using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaRelatorioRules : BusinessLogic
    {

        public List<DespesaCentroCusto> RelatorioByUnidade(int unidadeId, int mes, int ano) {
            var unidadeSelecionada = UnidadeRepositorio.FetchOne(unidadeId);

            if (unidadeSelecionada == null) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            if (unidadeSelecionada.Id != zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id &&
                !unidadeSelecionada.IsChildren(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id) &&
                unidadeSelecionada.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return DespesaRelatorioRepositorio.Relatorio(unidadeId, mes, ano);
        }

        public List<UnidadeCentroCustos> RelatorioByCentral(int centralId, int mes, int ano)
        {
            var unidadeSelecionada = UnidadeRepositorio.FetchOne(centralId);

            if (unidadeSelecionada == null)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            if (unidadeSelecionada.Id != zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id &&
                !unidadeSelecionada.IsChildren(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id) &&
                unidadeSelecionada.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var unidadesFilhas = UnidadeRepositorio.FetchUnidadesFilhas(unidadeSelecionada, true);
            var unidadeCentroCustos = new List<UnidadeCentroCustos>();
            
            foreach (var filha in unidadesFilhas)
            {
                unidadeCentroCustos.Add(new UnidadeCentroCustos()
                {
                    Unidade = filha,
                    CentroCustos = DespesaRelatorioRepositorio.Relatorio(filha.Id, mes, ano)
                });
            }

            return unidadeCentroCustos;
        }

        public List<UnidadeCentroCustos> RelatorioByZap(int mes, int ano)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (unidade.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var centrais = UnidadeRepositorio.Fetch(UnidadeTipo.CENTRAL);
            var unidadeCentroCustos = new List<UnidadeCentroCustos>();
             
            foreach (var central in centrais)
            {
                unidadeCentroCustos.Add(new UnidadeCentroCustos()
                {
                    Unidade = central,
                    CentroCustos = DespesaRelatorioRepositorio.DespesaUnidadesByCentral(central, mes, ano)
                });
            }

            return unidadeCentroCustos;
        }

    }
}