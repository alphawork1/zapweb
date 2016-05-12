using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{

    public enum DespesaStatus
    {
        ABERTA          = 0,
        REMETIDA        = 1,
        PAGA            = 2,
        AUTORIZADA      = 3,
        TODAS           = 5,
        NAO_PAGA        = 6,
        NAO_AUTORIZADA  = 7
    }

    public class Despesa
    {
        public int Id { get; set; }
        public int FornecedorId { get; set; }
        public int UnidadeId { get; set; }
        public int UsuarioId { get; set; }

        public DateTime Data { get; set; }
        public string Numero { get; set; }
        public DespesaStatus Status { get; set; }
        public decimal Total { get; set; }

        [PetaPoco.Ignore] public string Justificativa { get; set; }
        [PetaPoco.Ignore] public Fornecedor Fornecedor { get; set; }
        [PetaPoco.Ignore] public Unidade Unidade { get; set; }
        [PetaPoco.Ignore] public Usuario Usuario { get; set; }
        [PetaPoco.Ignore] public List<FinanceiroItem> Items { get; set; }
        [PetaPoco.Ignore] public List<Arquivo> Anexos { get; set; }
        [PetaPoco.Ignore] public List<DespesaHistorico> Historicos { get; set; }
    }
}