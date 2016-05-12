using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{

    public enum DocumentoTipo
    {
        CONDOMINIO_VERTICAL = 1,
        CONDOMINIO_HORIZONTAL = 2
    }

    public class Documento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int ArquivoId { get; set; }
        public DocumentoTipo Tipo { get; set; }

        [PetaPoco.Ignore] public Arquivo Arquivo { get; set; }
    }
}