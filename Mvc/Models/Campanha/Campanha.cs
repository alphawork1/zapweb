using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Campanha
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFim { get; set; }
        public decimal ValorAVista { get; set; }
        public decimal ValorCheque { get; set; }
        public decimal Acrescimo { get; set; }
        public decimal Desconto { get; set; }
        public int UsuarioId { get; set; }
        public int CondominioId { get; set; }

        [PetaPoco.Ignore] public Condominio Condominio { get; set; }
        [PetaPoco.Ignore] public List<Arquivo> Anexos { get; set; }
        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
    }
}