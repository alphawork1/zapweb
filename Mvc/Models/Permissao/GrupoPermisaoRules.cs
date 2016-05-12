using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class GrupoPermisaoRules : BusinessLogic
    {

        public bool Adicionar(GrupoPermissao grupo)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_PERMISSAO")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            if (GrupoPermissaoRepositorio.Exist(grupo)) {
                this.MessageError = "PERMISSAO_EXISTENTE";
                return false;
            }

            GrupoPermissaoRepositorio.Insert(grupo);

            return true;
        }

        public bool Update(GrupoPermissao grupo)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_PERMISSAO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            if (GrupoPermissaoRepositorio.Exist(grupo))
            {
                this.MessageError = "PERMISSAO_EXISTENTE";
                return false;
            }

            GrupoPermissaoRepositorio.Update(grupo);

            return true;
        }

        public bool Remove(GrupoPermissao grupo)
        {
            
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("EXCLUIR_PERMISSAO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (AccountRepositorio.TotalByGrupoPermissao(grupo) > 0)
            {
                this.MessageError = "PERMISSAO_EXCLUIR";
                return false;
            }

            GrupoPermissaoRepositorio.Delete(grupo);

            return true;
        }

        public bool AddPermissoes(GrupoPermissao grupo)
        {
            
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_PERMISSAO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            PermissaoRepositorio.DeleteByGrupoId(grupo.Id);
            PermissaoRepositorio.Insert(grupo);

            return true;
        }

        public List<GrupoPermissao> All()
        {
            var permissoes = GrupoPermissaoRepositorio.FetchAll();

            foreach (var permissao in permissoes)
            {
                permissao.Permissoes = PermissaoRepositorio.Fetch(permissao.Id);
            }

            return permissoes;
        }
        
    }
}