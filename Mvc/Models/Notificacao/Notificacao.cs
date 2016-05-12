using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Notificacao
    {
        public int Id { get; set; }
        public int DeId { get; set; }
        public int ParaId { get; set; }
        public DateTime Data { get; set; }
        public string Message { get; set; }
        public string Icon { get; set; }
        public string Href { get; set; }
        public bool Lida { get; set; }

        [PetaPoco.Ignore] public Usuario De { get; set; }
        [PetaPoco.Ignore] public Usuario Para { get; set; }
    }
}