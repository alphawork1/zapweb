using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class VariavelRepositorio
    {

        public static Variavel Insert(Variavel variavel)
        {
            Repositorio.GetInstance().Db.Insert(variavel);

            return variavel;
        }

        public static void Update(Variavel variavel)
        {
            Repositorio.GetInstance().Db.Update(variavel);
        }

        public static List<Variavel> Fetch()
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Variavel.*")
                                          .Append("FROM Variavel");

            return Repositorio.GetInstance().Db.Fetch<Variavel>(sql);
        }

        public static List<Variavel> FetchPublics()
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Variavel.*")
                                          .Append("FROM Variavel")
                                          .Append("WHERE IsShow = 1")
                                          .Append("ORDER BY Ordem");

            return Repositorio.GetInstance().Db.Fetch<Variavel>(sql);
        }

    }
}