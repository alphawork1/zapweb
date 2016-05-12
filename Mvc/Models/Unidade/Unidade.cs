using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public enum UnidadeTipo
    {
        ZAP = 0,
        CENTRAL = 1,
        COS = 2,
        TODOS = 3
    }

    public class Unidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public UnidadeTipo Tipo { get; set; }
        public int CidadeId { get; set; }
        public string Hierarquia { get; set; }
        public string Endereco { get; set; }
        public string EmailRemetente { get; set; }
        public string SenhaEmailRemetente { get; set; }

        [PetaPoco.Ignore] public List<Unidade> Unidades { get; set; }
        [PetaPoco.Ignore] public List<Usuario> Usuarios { get; set; }
        [PetaPoco.Ignore] public Cidade Cidade { get; set; }
        [PetaPoco.Ignore] public List<Arquivo> Anexos { get; set; }
        [PetaPoco.Ignore] public List<Telefone> Telefones { get; set; }

        public void SetParent(Unidade unidade)
        {
            this.Hierarquia = unidade.GetFullLevelHierarquia();
        }

        public string GetRelativeLevelHierarquia() {
            return this.Id + ".";
        }

        public string GetFullLevelHierarquia() {
            return this.Hierarquia + this.GetRelativeLevelHierarquia();
        }

        public int GetUnidadeIdPai() {
            var s = this.Hierarquia.Split('.');

            return int.Parse(s[s.Length - 2]);
        }

        public bool IsChildren(int parentId) {
            var s = this.Hierarquia.Split('.');

            foreach (var id in s)
            {
                if (parentId.ToString() == id) return true;
            }

            return false;
        }

        public bool IsParent(Unidade unidade)
        {
            return UnidadeRepositorio.IsUnidadeFilha(this, unidade);
        }

        public bool IsInTreeView(Unidade unidade)
        {
            if (unidade.Tipo == UnidadeTipo.ZAP) return true;
            if (unidade.Id == Id) return true;
            if (this.IsChildren(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id)) return true;

            return false;

        }
    }
}