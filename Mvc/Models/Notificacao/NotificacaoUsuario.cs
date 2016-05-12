using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class NotificacaoUsuario
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int Total { get; set; }

        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
    }
}