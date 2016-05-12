using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public enum AccountType
    {
        SUPER = 0,
        DEFAULT = 1
    }

    public class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }        
        public bool Ativa { get; set; }        
        public int UsuarioId { get; set; }
        public int GrupoPermissaoId { get; set; }
        public AccountType Tipo { get; set; }

        [PetaPoco.Ignore] public List<Session> Sessions { get; set; }
        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
        [PetaPoco.Ignore] public GrupoPermissao Permissao { get; set; }
    }
}