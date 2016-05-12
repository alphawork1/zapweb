using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{

    public enum VariavelTipo
    {
        MOEDA = 0,
        DATA = 1,
        HORA = 2,
        TEXTO = 3,
        FORMULA = 4
    }

    public class Variavel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Valor { get; set; }
        public bool IsShow { get; set; }
        public string Underscore { get; set; }
        public VariavelTipo Tipo { get; set; }
    }
}