using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UnidadeTelefoneRepositorio
    {

        public static void Insert(Unidade unidade, List<Telefone> telefones)
        {
            if (unidade == null) return;
            if (telefones == null) return;

            TelefoneRepositorio.Insert(unidade.Telefones);

            foreach (var telefone in telefones)
            {
                Repositorio.GetInstance().Db.Insert("UnidadeTelefone", "Id", new
                {
                    UnidadeId = unidade.Id,
                    TelefoneId = telefone.Id
                });
            }
        }

        public static void Delete(Unidade unidade)
        {
            if (unidade == null) return;

            Repositorio.GetInstance().Db.Execute("DELETE UnidadeTelefone, Telefone FROM UnidadeTelefone INNER JOIN Telefone ON Telefone.Id = UnidadeTelefone.TelefoneId WHERE UnidadeTelefone.UnidadeId = @0", unidade.Id);
        }

        public static void Update(Unidade unidade, List<Telefone> telefones)
        {
            UnidadeTelefoneRepositorio.Delete(unidade);
            UnidadeTelefoneRepositorio.Insert(unidade, telefones);
        }

        public static List<Telefone> FetchTelefones(Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Telefone.*")
                                          .Append("FROM UnidadeTelefone")
                                          .Append("INNER JOIN Telefone ON Telefone.Id = UnidadeTelefone.TelefoneId")
                                          .Append("WHERE UnidadeTelefone.UnidadeId = @0", unidade.Id);

            return Repositorio.GetInstance().Db.Fetch<Telefone>(sql);
        }

    }
}