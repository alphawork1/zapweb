using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UsuarioTelefoneRepositorio
    {

        public static void Insert(Usuario usuario, List<Telefone> telefones)
        {
            if (usuario == null) return;
            if (telefones == null) return;

            TelefoneRepositorio.Insert(usuario.Telefones);

            foreach (var telefone in telefones)
            {
                Repositorio.GetInstance().Db.Insert("UsuarioTelefone", "Id", new
                {
                    UsuarioId = usuario.Id,
                    TelefoneId = telefone.Id
                });
            }
        }

        public static void Delete(Usuario usuario)
        {
            if (usuario == null) return;

            Repositorio.GetInstance().Db.Execute("DELETE UsuarioTelefone, Telefone FROM UsuarioTelefone INNER JOIN Telefone ON Telefone.Id = UsuarioTelefone.TelefoneId WHERE UsuarioTelefone.UsuarioId = @0", usuario.Id);
        }

        public static void Update(Usuario usuario, List<Telefone> telefones)
        {
            UsuarioTelefoneRepositorio.Delete(usuario);
            UsuarioTelefoneRepositorio.Insert(usuario, telefones);
        }

        public static List<Telefone> FetchTelefones(Usuario usuario)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Telefone.*")
                                          .Append("FROM UsuarioTelefone")
                                          .Append("INNER JOIN Telefone ON Telefone.Id = UsuarioTelefone.TelefoneId")
                                          .Append("WHERE UsuarioTelefone.UsuarioId = @0", usuario.Id);

            return Repositorio.GetInstance().Db.Fetch<Telefone>(sql);
        }

    }
}