using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Administradora
    {

        public int Id { get; set; }        
        public string Nome { get; set; }
        public string Representante { get; set; }
        public int EnderecoId { get; set; }
        public string Email { get; set; }

        [PetaPoco.Ignore] public Endereco Endereco { get; set; }
        [PetaPoco.Ignore] public List<Telefone> Telefones { get; set; }

    }
}