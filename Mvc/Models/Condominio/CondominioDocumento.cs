using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class CondominioDocumento
    {
        public int Id { get; set; }
        public int CondominioId { get; set; }
        public int DocumentoId { get; set; }
        public int ArquivoId { get; set; }

    }
}