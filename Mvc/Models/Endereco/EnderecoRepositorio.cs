using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class EnderecoRepositorio
    {
        public static Endereco Insert(Endereco endereco)
        {
            if (endereco.Cidade != null) {
                endereco.CidadeId = endereco.Cidade.Id;
            }

            Repositorio.GetInstance().Db.Insert(endereco);

            return endereco;
        }

        public static void Update(Endereco endereco)
        {
            if (endereco.Cidade != null)
            {
                endereco.CidadeId = endereco.Cidade.Id;
            }

            Repositorio.GetInstance().Db.Update(endereco);
        }

        public static Endereco FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Endereco.*, Cidade.*")
                                          .Append("FROM Endereco")
                                          .Append("LEFT JOIN Cidade ON Cidade.Id = Endereco.CidadeId")
                                          .Append("WHERE Endereco.Id = @0", Id);

            var list = Repositorio.GetInstance().Db.Fetch<Endereco, Cidade, Endereco>((e, c) =>
            {
                e.Cidade = c;
                return e;
            }, sql);

            return list.Count == 0 ? null : list[0];
        }
    }
}