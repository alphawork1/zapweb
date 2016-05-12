using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
 
    public class Fornecedor
    {
        public int Id { get; set; }
        public int EnderecoId { get; set; }
        public int ContatoId { get; set; }
        public string RazaoSocial { get; set; }
        public string Fantasia { get; set; }
        public string Site { get; set; }
        public string Cnpj { get; set; }

        [PetaPoco.Ignore] public Endereco Endereco { get; set; }
        [PetaPoco.Ignore] public Contato Contato { get; set; }
    }
}