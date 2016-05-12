using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class ContatoTelefoneRepositorio
    {
        public static void Insert(Contato contato, List<Telefone> telefones)
        {
            if (contato == null) return;
            if (telefones == null) return;

            TelefoneRepositorio.Insert(telefones);

            foreach (var telefone in contato.Telefones)
            {
                Repositorio.GetInstance().Db.Insert("ContatoTelefone", "Id", new
                {
                    ContatoId = contato.Id,
                    TelefoneId = telefone.Id
                });
            }            
            
        }

        public static void Update(Contato contato, List<Telefone> telefones)
        {
            if (contato == null) return;
            if (telefones == null) return;

            ContatoTelefoneRepositorio.DeleteByContato(contato);
            ContatoTelefoneRepositorio.Insert(contato, telefones);            
        }

        public static void DeleteByContato(Contato contato) {
            Repositorio.GetInstance().Db.Execute("DELETE ContatoTelefone, Telefone FROM ContatoTelefone INNER JOIN Telefone ON Telefone.Id = ContatoTelefone.TelefoneId WHERE ContatoTelefone.ContatoId = @0", contato.Id);
        }

        public static List<Telefone> Fetch(Contato contato) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Telefone.*")
                                          .Append("FROM Contato")
                                          .Append("LEFT JOIN ContatoTelefone ON ContatoTelefone.ContatoId = Contato.Id")
                                          .Append("LEFT JOIN Telefone ON Telefone.Id = ContatoTelefone.TelefoneId")
                                          .Append("WHERE Contato.Id = @0", contato.Id)
                                          .Append("ORDER BY Contato.Nome");
            
            return Repositorio.GetInstance().Db.Fetch<Telefone>(sql).ToList();
        }
    }
}