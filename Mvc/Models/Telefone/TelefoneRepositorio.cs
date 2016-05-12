using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class TelefoneRepositorio
    {
        public static void Insert(List<Telefone> telefones)
        {
            if (telefones == null) return;

            foreach (var telefone in telefones)
            {
                Repositorio.GetInstance().Db.Insert(telefone);
            }
        }

        public static void Delete(List<Telefone> telefones)
        {
            if (telefones == null) return;
            var arr = new int[telefones.Count];

            for (int i = 0; i < telefones.Count; i++)
            {                
                arr[i] = telefones[i].Id;
            }

            Repositorio.GetInstance().Db.Execute("DELETE FROM Telefone WHERE Id IN (@0)", string.Join(",", arr));
        }
    }
}