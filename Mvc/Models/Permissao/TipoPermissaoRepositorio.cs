using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class TipoPermissaoRepositorio
    {
        public static List<TipoPermissao> FetchAll() {
            var sql = PetaPoco.Sql.Builder.Append("SELECT * FROM TipoPermissao ORDER BY Ordem");
            
            return Repositorio.GetInstance().Db.Fetch<TipoPermissao>(sql).ToList();
        }
    }
}