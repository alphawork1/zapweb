using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class ProspectarEmail
    {
        public int CondominioId { get; set; }
        public string Arquivos { get; set; }
        public string Assunto { get; set; }
        public string Mensagem { get; set; }
        public string Emails { get; set; }
    }
}