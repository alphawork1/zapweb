using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CampanhaRepositorio
    {

        public static Campanha Insert(Campanha campanha)
        {
            if (campanha.Usuario != null)
            {
                campanha.UsuarioId = campanha.Usuario.Id;
            }

            if (campanha.Condominio != null)
            {
                campanha.CondominioId = campanha.Condominio.Id;
            }

            Repositorio.GetInstance().Db.Insert(campanha);

            return campanha;
        }

        public static void Update(Campanha campanha)
        {
            if (campanha.Usuario != null)
            {
                campanha.UsuarioId = campanha.Usuario.Id;
            }

            if (campanha.Condominio != null)
            {
                campanha.CondominioId = campanha.Condominio.Id;
            }

            Repositorio.GetInstance().Db.Update(campanha);
        }

        public static void Delete(Campanha campanha)
        {
            Repositorio.GetInstance().Db.Delete(campanha);
        }
        
        public static List<Campanha> FetchByCondominioId(int condominioId)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Campanha")
                                          .Append("WHERE Campanha.CondominioId = @0", condominioId);

            return Repositorio.GetInstance().Db.Fetch<Campanha>(sql);
        }

        public static Campanha FetchOne(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Campanha")
                                          .Append("WHERE Campanha.Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Campanha>(sql);
        }        
    }
}