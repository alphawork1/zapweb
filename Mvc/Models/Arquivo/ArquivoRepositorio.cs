using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class ArquivoRepositorio
    {

        public static Arquivo Insert(Arquivo arquivo) {
            Repositorio.GetInstance().Db.Insert(arquivo);

            return arquivo;
        }

        public static void Delete(Arquivo arquivo) {
            TableDependency.Resolve(Repositorio.GetInstance().Db, "DELETE", "Arquivo", arquivo.Id);

            Repositorio.GetInstance().Db.Execute("DELETE FROM Arquivo WHERE Id = @0", arquivo.Id);
        }

        public static Arquivo FetchOne(int id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("WHERE Arquivo.Id = @0", id)
                                          .Append("ORDER BY Arquivo.Nome");

            return Repositorio.GetInstance().Db.SingleOrDefault<Arquivo>(sql);
        }

        public static Arquivo FetchOneByHash(string hash) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("WHERE Arquivo.Hash = @0", hash)
                                          .Append("ORDER BY Arquivo.Nome");

            return Repositorio.GetInstance().Db.SingleOrDefault<Arquivo>(sql);
        }
    }
}