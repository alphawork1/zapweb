using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Historico
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int CondominioId { get; set; }
        public DateTime Data { get; set; }
        public DateTime ProximoContato { get; set; }        
        public string Descricao { get; set; }
        public int Rank { get; set; }

        [PetaPoco.Ignore] public string Hora { get; set; }
        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
        [PetaPoco.Ignore] public Condominio Condominio { get; set; }
    }
}