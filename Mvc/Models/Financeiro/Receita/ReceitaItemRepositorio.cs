using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class ReceitaItemRepositorio
    {
        public static void Insert(Receita receita, List<ReceitaItem> items) {
            if (receita == null) return;
            if (items == null) return;

            foreach (var item in items)
            {
                item.ReceitaId = receita.Id;
                Repositorio.GetInstance().Db.Insert(item);
            }
        }

        public static void Update(Receita receita, List<ReceitaItem> items)
        {
            if (receita == null) return;
            if (items == null) return;

            ReceitaItemRepositorio.Delete(receita);
            ReceitaItemRepositorio.Insert(receita, items);
        }

        public static void Delete(Receita receita)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM ReceitaItem WHERE ReceitaItem.ReceitaId = @0", receita.Id);
        }

        public Receita Fetch(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, ReceitaItem.*, Unidade.*")
                                          .Append("FROM Receita")
                                          .Append("LEFT JOIN ReceitaItem ON ReceitaItem.ReceitaId = Receita.Id")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE Receita.Id = @0", Id);

            Receita receita = null;

            var receitas = Repositorio.GetInstance().Db.Fetch<Receita, ReceitaItem, Unidade, Receita>((r, i, u) =>
            {

                if (receita == null) {
                    receita = r;
                    receita.Items = new List<ReceitaItem>();
                    receita.Unidade = u;
                }

                receita.Items.Add(i);

                return r;
            }, sql);

            if (receitas == null) return null;

            return receita;
        }

        public static Receita Fetch(int mes, int ano, int unidadeId)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, ReceitaItem.*, Unidade.*")
                                          .Append("FROM Receita")
                                          .Append("LEFT JOIN ReceitaItem ON ReceitaItem.ReceitaId = Receita.Id")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1 AND Unidade.Id = @2", mes, ano, unidadeId);

            Receita receita = null;

            var receitas = Repositorio.GetInstance().Db.Fetch<Receita, ReceitaItem, Unidade, Receita>((r, i, u) =>
            {

                if (receita == null)
                {
                    receita = r;
                    receita.Items = new List<ReceitaItem>();
                    receita.Unidade = u;
                }

                receita.Items.Add(i);

                return r;
            }, sql);

            if (receita == null) return new Receita();
            else return receita;
        }

        public static List<Receita> FetchAll(Unidade unidade) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, (SELECT SUM(Valor) FROM ReceitaItem WHERE ReceitaItem.ReceitaId = Receita.Id) as Total, Unidade.*")
                                          .Append("FROM Receita")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1", unidade.GetFullLevelHierarquia() + '%', unidade.Id)
                                          .Append("ORDER BY DATE(CONCAT(Receita.Ano, '-', Receita.Mes, '-01')) DESC, Unidade.Nome");

            
            return Repositorio.GetInstance().Db.Fetch<Receita, Unidade, Receita>((r, u) =>
            {
                r.Unidade = u;
                return r;
            }, sql);
        }

        public static List<Receita> FetchAll(int mes, int ano, Unidade central)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, (SELECT SUM(Valor) FROM ReceitaItem WHERE ReceitaItem.ReceitaId = Receita.Id) as Total, Unidade.*")
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

        public static List<Receita> ReceitasPorCentral(int mes, int ano, Unidade central)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*, (SELECT SUM(Valor) FROM ReceitaItem WHERE ReceitaItem.ReceitaId = Receita.Id) as Total, Unidade.*")
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

        public static Receita Fetch(int mes, int ano)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*")
                                          .Append("FROM Receita")
                                          .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1", mes, ano);

            return Repositorio.GetInstance().Db.SingleOrDefault<Receita>(sql);
        }

        public static decimal TotalPorCentral(Unidade central, int mes, int ano)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT IF(SUM(Receita.Total) IS NULL, 0, SUM(Receita.Total)) as Total ")
                                          .Append("FROM Receita")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
                                          .Append("WHERE Unidade.Hierarquia LIKE @2 AND Receita.Mes = @0 AND Receita.Ano = @1", mes, ano, central.GetFullLevelHierarquia() + '%');

            return Repositorio.GetInstance().Db.ExecuteScalar<decimal>(sql);
        }

        //public List<Receita> ReceitasPorCentral(int mes, int ano, Unidade central)
        //{
        //    var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.Id, Unidade.Nome, SUM(Receita.Total) as Total")
        //                                  .Append("FROM Unidade")
        //                                  .Append("INNER JOIN Unidade ON Unidade.Id = Receita.UnidadeId")
        //                                  .Append("INNER JOIN Unidade AS Filha ON INSTR(Filha.Hierarquia, CONCAT(Unidade.Id, '.')) > 0")
        //                                  .Append("INNER JOIN Receita ON Receita.UnidadeId = Filha.Id")
        //                                  .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1", mes, ano)
        //                                  .Append("AND Unidade.Tipo = @0", UnidadeTipo.CENTRAL)
        //                                  .Append("GROUP BY Unidade.Nome")
        //                                  .Append("ORDER BY Receita.Mes, Receita.Ano, Unidade.Nome");


        //    return this.Db.Fetch<Receita, Unidade, Receita>((r, u) =>
        //    {
        //        r.Unidade = u;
        //        return r;
        //    }, sql);
        //}

        //public Receita Fetch(int mes, int ano, int unidadeId)
        //{
        //    var sql = PetaPoco.Sql.Builder.Append("SELECT Receita.*")
        //                                  .Append("FROM Receita")
        //                                  .Append("WHERE Receita.Mes = @0 AND Receita.Ano = @1 AND Receita.UnidadeId = @2", mes, ano, unidadeId);

        //    return this.Db.SingleOrDefault<Receita>(sql);
        //}
    }
}