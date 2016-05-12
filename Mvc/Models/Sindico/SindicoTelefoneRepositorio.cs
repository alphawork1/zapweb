using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class SindicoTelefoneRepositorio
    {        
        public static void Insert(Sindico sindico, List<Telefone> telefones)
        {
            if (sindico == null) return;
            if (telefones == null) return;

            foreach (var telefone in telefones)
            {
                Repositorio.GetInstance().Db.Insert("SindicoTelefone", "Id", new {
                    SindicoId = sindico.Id,
                    TelefoneId = telefone.Id
                });
            }
        }

    }
}