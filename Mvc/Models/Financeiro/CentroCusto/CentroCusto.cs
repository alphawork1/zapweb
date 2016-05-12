using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public enum TipoCentroCusto
    {
        ENTRADA = 0,
        SAIDA = 1,
        TODOS = 2
    }

    public class CentroCusto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public TipoCentroCusto Tipo { get; set; }
    }
}