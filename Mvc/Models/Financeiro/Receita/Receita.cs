using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Receita
    {
        public int Id { get; set; }
        public int UnidadeId { get; set; }
        public int Mes { get; set; }
        public int Ano { get; set; }
        public decimal Total { get; set; }

        [PetaPoco.Ignore] public List<ReceitaItem> Items { get; set; }
        [PetaPoco.Ignore] public Unidade Unidade { get; set; }
    }
}