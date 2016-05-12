using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CentroCustoRules : BusinessLogic
    {

        public bool Adicionar(CentroCusto centroCusto) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_CENTRO_CUSTO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (CentroCustoRepositorio.Exist(centroCusto))
            {
                this.MessageError = "CENTRO_CUSTO_EXISTENTE";
                return false;
            }

            CentroCustoRepositorio.Insert(centroCusto);

            return true;
        }

        public bool Update(CentroCusto centroCusto)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CENTRO_CUSTO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (CentroCustoRepositorio.Exist(centroCusto))
            {
                this.MessageError = "CENTRO_CUSTO_EXISTENTE";
                return false;
            }

            CentroCustoRepositorio.Update(centroCusto);

            return true;
        }

        public bool Excluir(CentroCusto centroCusto)
        {
            if (CentroCustoRepositorio.HashVinculo(centroCusto))
            {
                this.MessageError = "CENTRO_CUSTO_VINCULADO";
                return false;
            }

            CentroCustoRepositorio.Delete(centroCusto);

            return true;
        }

        public List<CentroCusto> Tipo(TipoCentroCusto tipo) {
            return CentroCustoRepositorio.FetchByTipo(tipo);
        }

    }
}