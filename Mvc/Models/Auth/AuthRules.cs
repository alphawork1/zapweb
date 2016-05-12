using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class AuthRules : BusinessLogic
    {

        public bool Logar(Account account) {            
            var accountCurrent = AccountRepositorio.FetchOne(account.Username);

            //usuario nao existe
            if (accountCurrent == null)
            {
                this.MessageError = "USUARIO_SENHA_INCORRETA";
                return false;
            }

            //senha errada
            if (accountCurrent.Password != account.Password)
            {
                this.MessageError = "USUARIO_SENHA_INCORRETA";
                return false;
            }

            //usuario cancelado
            if (!accountCurrent.Ativa) {
                this.MessageError = "USUARIO_CANCELADO";
                return false;
            }

            var session = new Session();
            session.Data = DateTime.Now;
            session.Presence = Repositorio.UUID();
            session.Account = accountCurrent;
            session.IP = "";

            SessionRepositorio.Insert(session);

            zapweb.Lib.Session.GetInstance().Create(session.Presence);

            return true;
        }

        public Usuario GetCurrent()
        {
            var account = zapweb.Lib.Session.GetInstance().Account;
            var usuario = UsuarioRepositorio.FetchOne(account.UsuarioId);

            usuario.Unidade = UnidadeRepositorio.FetchOne(usuario.UnidadeId);
            usuario.Permissoes = account.Permissao;

            return usuario;
        }

        public void Sair() {            
            SessionRepositorio.DeleteBySession(zapweb.Lib.Session.GetInstance().Presence);

            zapweb.Lib.Session.GetInstance().Destroy();
        }

    }
}