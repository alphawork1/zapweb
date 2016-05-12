using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public int UnidadeId { get; set; }
        public string Tratamento { get; set; }
        public string Apelido { get; set; }
        public bool IsRepresentante { get; set; }

        [PetaPoco.Ignore] public Unidade Unidade { get; set; }
        [PetaPoco.Ignore] public Account Account { get; set; }
        [PetaPoco.Ignore] public List<Arquivo> Anexos { get; set; }
        [PetaPoco.Ignore] public GrupoPermissao Permissoes { get; set; }
        [PetaPoco.Ignore] public List<Telefone> Telefones { get; set; }
    }
}