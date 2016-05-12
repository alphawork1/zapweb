using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class ReceitaItem
    {
        public int Id { get; set; }
        public int ReceitaId { get; set; }
        public int Dia { get; set; }
        public string Cliente { get; set; }
        public decimal Valor { get; set; }
    }
}