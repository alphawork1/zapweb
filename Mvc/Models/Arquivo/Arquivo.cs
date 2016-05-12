using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Arquivo
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Size { get; set; }
        public string Tipo { get; set; }
        public string Hash { get; set; }
    }
}