using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public enum TipoTelefone
    {
        FIXO = 1,
        Comercial,
        Celular,
        Fax,
        Whatsapp
    }

    public class Telefone
    {
        public int Id { get; set; }
        public TipoTelefone Tipo { get; set; }
        public string Numero { get; set; }
    }
}