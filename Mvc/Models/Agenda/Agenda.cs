using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{

    public enum AgendaTipo
    {
        HISTORICO = 1,
        MANUAL = 2
    }

    public class Agenda
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public int UnidadeId { get; set; }
        public int UsuarioId { get; set; }
        public string Url { get; set; }

        [PetaPoco.Ignore] public AgendaTipo Tipo { get; set; }
        [PetaPoco.Ignore] public Unidade Unidade { get; set; }
        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
    }
}