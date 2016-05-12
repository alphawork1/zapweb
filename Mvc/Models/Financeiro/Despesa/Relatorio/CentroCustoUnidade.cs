using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class UnidadeCentroCustos
    {
        public Unidade Unidade { get; set; }
        public List<DespesaCentroCusto> CentroCustos { get; set; }
    }
}