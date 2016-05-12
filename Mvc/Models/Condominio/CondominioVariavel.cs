using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class CondominioVariavel
    {
        public int Id { get; set; }
        public int CondominioId { get; set; }
        public int VariavelId { get; set; }
        public string Valor { get; set; }
    }
}