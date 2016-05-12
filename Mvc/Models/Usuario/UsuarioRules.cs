using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UsuarioRules : BusinessLogic
    {

        public bool Adicionar(Usuario usuario) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_USUARIO")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
                      
            var zap = UnidadeRepositorio.FetchZapUnidade();

            if (UsuarioRepositorio.Exist(usuario)) {
                this.MessageError = "USUARIO_EXISTENTE_NOME";
                return false;
            }

            if (AccountRepositorio.Exist(usuario.Account))
            {
                this.MessageError = "USERNAME_EXISTENTE_NOME";
                return false;
            }

            usuario.Unidade = zap;
            UsuarioRepositorio.Insert(usuario);
            UsuarioAnexoRepositorio.UpdateAnexos(usuario);
            
            usuario.Account.Usuario = usuario;
            usuario.Account.Ativa = true;
            usuario.Account.Tipo = AccountType.DEFAULT;
            AccountRepositorio.Insert(usuario.Account);
            
            UsuarioTelefoneRepositorio.Insert(usuario, usuario.Telefones);

            usuario.Account.Usuario = null;

            //var notificacaoRepositorio = new NotificacaoUsuarioRepositorio();
            //notificacaoRepositorio.Add(new NotificacaoUsuario()
            //{
            //    UsuarioId = usuario.Id,
            //    Total = 0
            //});

            return true;
        }

        public bool Update(Usuario usuario)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_USUARIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }                       

            if (UsuarioRepositorio.Exist(usuario))
            {
                this.MessageError = "USUARIO_EXISTENTE_NOME";
                return false;
            }

            if (AccountRepositorio.Exist(usuario.Account))
            {
                this.MessageError = "USERNAME_EXISTENTE_NOME";
                return false;
            }

            UsuarioRepositorio.Update(usuario);
            UsuarioAnexoRepositorio.UpdateAnexos(usuario);
            UsuarioTelefoneRepositorio.Update(usuario, usuario.Telefones);

            AccountRepositorio.Update(usuario.Account);            

            usuario.Account.Usuario = null;

            return true;
        }

        public Usuario Get(int Id) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_USUARIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var usuario = UsuarioRepositorio.FetchOne(Id);

            usuario.Unidade = UnidadeRepositorio.FetchOne(usuario.UnidadeId);
            usuario.Account = AccountRepositorio.FetchByUsuarioId(usuario.Id);
            usuario.Account.Permissao = GrupoPermissaoRepositorio.FetchOne(usuario.Account.GrupoPermissaoId);
            usuario.Anexos = UsuarioAnexoRepositorio.FetchAnexos(usuario);
            usuario.Telefones = UsuarioTelefoneRepositorio.FetchTelefones(usuario);            

            return usuario;
        }

        public List<Usuario> Search(string nome)
        {                    
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            return UsuarioRepositorio.Fetch(nome, unidadeDoCurrent);
        }

        public List<Usuario> All(int unidadeId) {                        
            var unidade = UnidadeRepositorio.FetchOne(unidadeId);

            return UsuarioRepositorio.Fetch(unidade, true);
        }

    }
}