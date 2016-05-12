using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class ContatoRepositorio
    {
        public static void Insert(Contato contato)
        {
            Repositorio.GetInstance().Db.Insert(contato);
        }

        public static void Update(Contato contato)
        {
            Repositorio.GetInstance().Db.Update(contato);
        }
        
        public static Contato FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Contato.*")
                                          .Append("FROM Contato")                                          
                                          .Append("WHERE Contato.Id = @0", Id);
            
            return Repositorio.GetInstance().Db.Single<Contato>(sql);
        }
    }
}