using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class FinanceiroItem
    {
        public int Id { get; set; }
        public int CentroCustoId { get; set; }

        public string Descricao { get; set; }
        public string Unidade { get; set; }
        public int Qtde { get; set; }
        public decimal Valor { get; set; }

        [PetaPoco.Ignore] public CentroCusto CentroCusto { get; set; }
    }
}