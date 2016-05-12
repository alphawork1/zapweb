using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class CondominioSearch
    {
        public int Rank { get; set; }
        public string Nome { get; set; }
        public Administradora Administradora { get; set; }
        public Unidade Unidade { get; set; }
        public DateTime UltimaCampanha { get; set; }
        public Endereco Endereco { get; set; }
    }
}