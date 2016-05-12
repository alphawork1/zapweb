using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class SindicoRepositorio
    {

        public static Sindico Insert(Sindico sindico)
        {
            if (sindico.Endereco != null)
            {
                sindico.EnderecoId = sindico.Endereco.Id;
            }

            Repositorio.GetInstance().Db.Insert(sindico);

            return sindico;
        }

        public static List<Sindico> Fetch(string nome)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Sindico")
                                          .Append("WHERE Nome LIKE @0", "%" + nome + "%");

            return Repositorio.GetInstance().Db.Fetch<Sindico>(sql);

        }    

    }
}