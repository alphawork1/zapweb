using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

using Pillar.RealTime;

namespace zapweb.Models
{
    public class ReceitaRelatorioRules : BusinessLogic
    {

        public Receita ReceitaUnidade(Unidade unidade, int mes, int ano)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRepositorio.FetchOne(mes, ano, unidade.Id);
        }

        public List<ReceitaCentral> ReceitasPorCentral(int mes, int ano)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRelatorioRepositorio.ReceitasPorCentral(mes, ano);
        }

        public List<Receita> ReceitasUnidadesFilhas(Unidade central, int mes, int ano)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRelatorioRepositorio.ReceitasUnidadesFilhas(central, mes, ano);
        }

        public decimal? TotalPorUnidade(int unidadeId, int mes, int ano)
        {            
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            //if (unidade.Id != unidadeId)
            //{
            //    this.MessageError = "USUARIO_SEM_PERMISSAO";
            //    return null;
            //}

            if (!unidade.IsChildren(unidadeId))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            unidade = UnidadeRepositorio.FetchOne(unidadeId);

            return ReceitaRelatorioRepositorio.TotalPorUnidade(unidade, mes, ano);
        }

        public decimal? TotalPorCentral(int centralId, int mes, int ano) {
            var central = UnidadeRepositorio.FetchOne(centralId);
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);
            
            //if (unidade.Tipo == UnidadeTipo.COS)
            //{
            //    this.MessageError = "USUARIO_SEM_PERMISSAO";
            //    return null;
            //}

            if(centralId != unidade.Id && !central.IsChildren(unidade.Id)) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRelatorioRepositorio.TotalPorUnidade(central, mes, ano);
        }

        public decimal? TotalPorZap(int mes, int ano)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRelatorioRepositorio.TotalPorUnidade(unidade, mes, ano);
        }
                
    }
}