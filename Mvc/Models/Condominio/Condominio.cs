using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public enum CondominioStatus
    {
        CLIENTE = 1,
        ARQUIVADO  = 2,
        EM_NEGOCIACAO = 3
    }

    public class Condominio
    {
        public int Id { get; set; }
        public string Nome { get; set; }        
        public string Colaborador { get; set; }
        public string Cadastrador { get; set; }
        public int QuantidadeAndaresBloco { get; set; }
        public int QuantidadeApto{ get; set; }
        public int QuantidadeBlocos { get; set; }
        public string Observacao { get; set; }
        public DateTime DataUltimaCampanha { get; set; }
        public DateTime DataCadastro { get; set; }
        public int Rank { get; set; }
        public int Nota { get; set; }
        public CondominioStatus Status { get; set; }
        public DateTime ProximoContato { get; set; }
        public bool IsReferencia { get; set; }
        public int NotaAparencia { get; set; }
        public string ClasseSocial { get; set; }
        public int NotaCadastrador { get; set; }
        public string TelefonePortaria { get; set; }
        public string Email { get; set; }
        public string DisposicaoPorAndar { get; set; }
        public string AvaliacaoCadastrador { get; set; }

        public int AdministradoraId { get; set; }
        public int UnidadeId { get; set; }
        public int SindicoId { get; set; }
        public int ZeladorId { get; set; }
        public int EnderecoId { get; set; }

        [PetaPoco.Ignore] public Endereco Endereco { get; set; }
        [PetaPoco.Ignore] public Administradora Administradora { get; set; }
        [PetaPoco.Ignore] public Contato Sindico { get; set; }
        [PetaPoco.Ignore] public Contato Zelador { get; set; }
        [PetaPoco.Ignore] public Unidade Unidade { get; set; }
        [PetaPoco.Ignore] public List<Variavel> Variaveis { get; set; }
        [PetaPoco.Ignore] public List<Documento> Documentos { get; set; }
    }
}