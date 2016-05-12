using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib.Mvc;
using zapweb.Models;

namespace zapweb.Controllers
{

    public class AuthController : zapweb.Lib.Mvc.Controller
    {
        
        public string Entrar(Account account) {
            var authRules = new AuthRules();

            if (authRules.Logar(account)) return Success(account);
            else return Error(authRules.MessageError);
        }

        public string Sair()
        {
            var authRules = new AuthRules();

            authRules.Sair();

            return Success(new { });
        }
        
        public string IsAutenticate()
        {
            var rules = new AuthRules();
            if (zapweb.Lib.Session.GetInstance().Exist())
            {
                return Success(rules.GetCurrent());
            }else
            {
                return Error("");
            }
        }

    }
}
