using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{

    public class DespesaPesquisa {
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string Numero { get; set; }
        public int Status { get; set; }
        public float ValorMaior { get; set; }
        public float ValorMenor { get; set; }
        public Fornecedor Fornecedor { get; set; }
        public Unidade Unidade { get; set; }
        public Usuario Usuario { get; set; }
    }

}