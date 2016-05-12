using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CentroCustoRepositorio
    {

        public static CentroCusto Insert(CentroCusto centroCusto) {
            Repositorio.GetInstance().Db.Insert(centroCusto);

            return centroCusto;
        }

        public static void Update(CentroCusto centroCusto) {
            var current = CentroCustoRepositorio.FetchOne(centroCusto.Id);
            var newNome = centroCusto.Nome;

            var ccs = CentroCustoRepositorio.Fetch(current.Nome);

            foreach (var centro in ccs)
            {
                centro.Nome = centro.Nome.Replace(current.Nome, newNome);
                Repositorio.GetInstance().Db.Update(centro);
            }

            Repositorio.GetInstance().Db.Update(centroCusto);
        }

        public static CentroCusto FetchOne(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM CentroCusto")
                                          .Append("WHERE Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<CentroCusto>(sql);
        }

        public static List<CentroCusto> Fetch(string nome)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM CentroCusto")
                                          .Append("WHERE Nome LIKE @0", nome + ":%");

            return Repositorio.GetInstance().Db.Fetch<CentroCusto>(sql);
        }

        public static bool HashVinculo(CentroCusto centroCusto)
        {
            return Repositorio.GetInstance().Db.ExecuteScalar<bool>("SELECT COUNT(*) FROM FinanceiroItem WHERE FinanceiroItem.CentroCustoId = @0", centroCusto.Id);
        }

        public static void Delete(CentroCusto centroCusto)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM CentroCusto WHERE CentroCusto.Id = @0", centroCusto.Id);
        }

        public static bool Exist(CentroCusto centroCusto) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM CentroCusto")
                                          .Append("WHERE Nome = @0 AND Id != @1", centroCusto.Nome, centroCusto.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<bool>(sql);
        }

        public static List<CentroCusto> FetchByTipo(TipoCentroCusto tipo)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT CentroCusto.*")
                                          .Append("FROM CentroCusto");

            if (tipo != TipoCentroCusto.TODOS)
            {
                sql.Append("WHERE CentroCusto.Tipo = @0", tipo);
            }

            sql.Append("ORDER BY CentroCusto.Nome");

            return Repositorio.GetInstance().Db.Fetch<CentroCusto>(sql).ToList();
        }

        public static List<CentroCusto> FetchAll() {
            var sql = PetaPoco.Sql.Builder.Append("SELECT CentroCusto.*")
                                          .Append("FROM CentroCusto")
                                          .Append("ODER BY CentroCusto.Nome");

            return Repositorio.GetInstance().Db.Fetch<CentroCusto>(sql).ToList();
        }

    }
}