using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaRelatorioRepositorio
    {

        public static List<DespesaCentroCusto> Relatorio(int unidadeId, int mes, int ano) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT CentroCusto.Nome, SUM(FinanceiroItem.Qtde * FinanceiroItem.Valor) as Total")
                                          .Append("FROM CentroCusto")
                                          .Append("INNER JOIN FinanceiroItem ON FinanceiroItem.CentroCustoId = CentroCusto.Id")
                                          .Append("INNER JOIN DespesaItem ON DespesaItem.ItemId = FinanceiroItem.Id")
                                          .Append("INNER JOIN Despesa ON Despesa.Id = DespesaItem.DespesaId")
                                          .Append("WHERE Despesa.UnidadeId = @0", unidadeId)
                                          .Append("AND MONTH(Despesa.Data) = @0 AND YEAR(Despesa.Data) = @1", mes + 1, ano)
                                          .Append("AND Despesa.Status = @0", DespesaStatus.AUTORIZADA)
                                          .Append("GROUP BY CentroCusto.Nome")
                                          .Append("ORDER BY CentroCusto.Nome");

            return Repositorio.GetInstance().Db.Fetch<DespesaCentroCusto>(sql);
        }

        public static List<DespesaCentroCusto> DespesaUnidadesByCentral(Unidade central, int mes, int ano)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.Nome, SUM(Despesa.Total) as Total")
                                          .Append("FROM Despesa")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Despesa.UnidadeId")
                                          .Append("WHERE Unidade.Hierarquia LIKE @0", central.GetFullLevelHierarquia() + '%')
                                          .Append("AND Despesa.Status = @0", DespesaStatus.AUTORIZADA)
                                          .Append("AND MONTH(Despesa.Data) = @0 AND YEAR(Despesa.Data) = @1", mes + 1, ano)
                                          .Append("GROUP BY Unidade.Nome");

            return Repositorio.GetInstance().Db.Fetch<DespesaCentroCusto>(sql);
        }

    }
}