using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class ReceitaRelatorioRepositorio
    {
        
        public static List<Receita> ReceitasUnidadesFilhas(Unidade central, int mes, int ano)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, Unidade.*")
                                          .Append("FROM Receita")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1", mes, ano)
                                          .Append("AND Unidade.Hierarquia LIKE @0", central.GetFullLevelHierarquia() + '%')
                                          .Append("ORDER BY Receita.Mes, Receita.Ano, Unidade.Nome");

            return Repositorio.GetInstance().Db.Fetch<Receita, Unidade, Receita>((r, u) =>
            {
                r.Unidade = u;
                return r;
            }, sql);
        }

        public static List<ReceitaCentral> ReceitasPorCentral(int mes, int ano)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.Id, Unidade.Nome, SUM(Receita.Total) as Total")
                                          .Append("FROM Unidade")
                                          .Append("INNER JOIN Unidade AS Filha")
                                          .Append("INNER JOIN Receita ON Receita.UnidadeId = Filha.Id")
                                          .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1", mes, ano)
                                          .Append("AND Unidade.Tipo = @0", UnidadeTipo.CENTRAL)
                                          .Append("AND (INSTR(Filha.Hierarquia, CONCAT(Unidade.Id, '.')) > 0 OR Filha.Id = Unidade.Id)")
                                          .Append("GROUP BY Unidade.Nome")
                                          .Append("ORDER BY Receita.Mes, Receita.Ano, Unidade.Nome");


            return Repositorio.GetInstance().Db.Fetch<ReceitaCentral>(sql);
        }

        public static decimal TotalPorUnidade(Unidade unidadePai, int mes, int ano) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT IF(SUM(Receita.Total) IS NULL, 0, SUM(Receita.Total)) as Total ")
                                          .Append("FROM Receita")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1) AND Receita.Mes = @2 AND Receita.Ano = @3", unidadePai.GetFullLevelHierarquia() + '%', unidadePai.Id, mes, ano);

            return Repositorio.GetInstance().Db.ExecuteScalar<decimal>(sql);
        }
    }
}