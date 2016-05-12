using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class SessionRepositorio
    {
        public static void Insert(Session session) {
            
            if(session.Account != null){
                session.AccountId = session.Account.Id;
            }

            Repositorio.GetInstance().Db.Insert(session);
        }

        public static void DeleteBySession(string session) {
            var sql = PetaPoco.Sql.Builder.Append("DELETE FROM Session WHERE Presence = @0", session);
            Repositorio.GetInstance().Db.Execute(sql);
        }

    }
}