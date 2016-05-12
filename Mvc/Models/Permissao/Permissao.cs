using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Permissao
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int GrupoId { get; set; }
    }
}