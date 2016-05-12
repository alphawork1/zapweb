using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class GrupoPermissao
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        [PetaPoco.Ignore] public List<Permissao> Permissoes { get; set; }

        public bool Has(string permissao) {
            var b = false;

            foreach (var p in Permissoes)
            {                
                if (p.Nome == permissao) {
                    b = true;
                    break;
                }
            }

            return b;
        }
    }
}