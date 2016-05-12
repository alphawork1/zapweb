using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class TableDependency
    {
        public static void Resolve(PetaPoco.Database dataBase, string tipo,  string tableName, int id)
        {
            dataBase.Execute("CALL RESOLVE_TABLE_RELATION_DEPENDENCY('" + tipo + "', '" + tableName + "', " + id + ")");
        }
    }
}