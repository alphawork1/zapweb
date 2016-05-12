using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class GrupoPermissaoRepositorio
    {

        public static void Insert(GrupoPermissao grupo) {
            Repositorio.GetInstance().Db.Insert(grupo);
        }

        public static void Update(GrupoPermissao grupo)
        {
            Repositorio.GetInstance().Db.Update(grupo);
        }

        public static void Delete(GrupoPermissao grupo)
        {
            Repositorio.GetInstance().Db.Delete(grupo);
        }

        public static bool Exist(GrupoPermissao grupo)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM GrupoPermissao")
                                          .Append("WHERE Nome = @0 AND Id != @1", grupo.Nome, grupo.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql) == 0 ? false : true;
        }

        public static List<GrupoPermissao> FetchAll()
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT GrupoPermissao.*")
                                          .Append("FROM GrupoPermissao")
                                          .Append("ORDER BY GrupoPermissao.Nome");

            return Repositorio.GetInstance().Db.Fetch<GrupoPermissao>(sql).ToList();
        }

        public static GrupoPermissao FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT GrupoPermissao.*")
                                          .Append("FROM GrupoPermissao")
                                          .Append("WHERE GrupoPermissao.Id = @0", Id)
                                          .Append("ORDER BY GrupoPermissao.Nome");

            return Repositorio.GetInstance().Db.SingleOrDefault<GrupoPermissao>(sql);
        }

    }
}