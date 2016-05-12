using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

using zapweb.Models;

namespace zapweb.Lib
{
    public class Session
    {
        public readonly Account Account;

        public string Presence
        {
            get
            {
                return HttpContext.Current.User.Identity.Name;
            }
        }

        public Session()
        {
            if (Presence.Length > 0)
            {
                Account = AccountRepositorio.FetchBySession(Presence);
                if (Account == null) return;
                Account.Permissao = GrupoPermissaoRepositorio.FetchOne(Account.GrupoPermissaoId);
                Account.Permissao.Permissoes = PermissaoRepositorio.Fetch(Account.GrupoPermissaoId);
            }
            
        }

        public static Session GetInstance()
        {
            if (HttpContext.Current.Items["SessionContext"] == null)
            {
                HttpContext.Current.Items["SessionContext"] = (Session)new Session();
            }

            return (Session)HttpContext.Current.Items["SessionContext"];
        }        

        public void Create(string uuid)
        {
            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(1, uuid, DateTime.Now, DateTime.Now.AddDays(1), true, uuid);
            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            HttpContext.Current.Response.Cookies.Add(authCookie);
        }

        public bool Exist()
        {
            return Presence.Length > 0;
        }

        public void Destroy()
        {
            FormsAuthentication.SignOut();
        }
    }
}