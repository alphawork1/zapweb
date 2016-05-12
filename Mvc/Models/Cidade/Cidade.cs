using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Cidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Estado { get; set; }
        public string Sigla { get; set; }
    }
}