using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class RealTimeRepositorio
    {
        public static void Insert(RealTime realtime)
        {
            Repositorio.GetInstance().Db.Insert(realtime);
        }

        public static void Update(RealTime realtime)
        {
            Repositorio.GetInstance().Db.Update(realtime);
        }

        public static RealTime FetchOne(string sessionId) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT RealTime.*")
                                          .Append("FROM RealTime")
                                          .Append("WHERE SessionId = @0", sessionId)
                                          .Append("ORDER BY Id DESC")
                                          .Append("LIMIT 1");

            return Repositorio.GetInstance().Db.SingleOrDefault<RealTime>(sql);
        }

    }
}