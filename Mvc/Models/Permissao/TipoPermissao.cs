using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class TipoPermissao
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public float Ordem { get; set; }
        public string Nome { get; set; }
        public string Grupo { get; set; }
    }
}