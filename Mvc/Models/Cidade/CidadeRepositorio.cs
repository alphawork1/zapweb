using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CidadeRepositorio
    {

        public static List<Cidade> Fetch(string nome) {
            return Repositorio.GetInstance().Db.Fetch<Cidade>("SELECT * FROM Cidade WHERE Nome LIKE @0 ORDER BY Nome LIMIT 20", nome + '%').ToList();
        }

        public static Cidade FetchOne(int Id) {
            return Repositorio.GetInstance().Db.SingleOrDefault<Cidade>("SELECT * FROM Cidade WHERE Id = @0", Id);
        }

    }
}