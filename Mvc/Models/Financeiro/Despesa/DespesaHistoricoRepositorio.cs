using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaHistoricoRepositorio
    {
        public static DespesaHistorico Insert(DespesaHistorico historico) {

            if (historico.Despesa != null)
            {
                historico.DespesaId = historico.Despesa.Id;
            }

            if (historico.Usuario != null)
            {
                historico.UsuarioId = historico.Usuario.Id;
            }

            Repositorio.GetInstance().Db.Insert(historico);

            return historico;
        }

        public static void Delete(Despesa despesa)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM DespesaHistorico WHERE DespesaHistorico.DespesaId = @0", despesa.Id);
        }

        public static List<DespesaHistorico> FetchHistoricos(Despesa despesa) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT DespesaHistorico.*")
                                          .Append("FROM DespesaHistorico")
                                          .Append("WHERE DespesaHistorico.DespesaId = @0", despesa.Id);

            return Repositorio.GetInstance().Db.Fetch<DespesaHistorico>(sql).ToList();
        }
    }
}