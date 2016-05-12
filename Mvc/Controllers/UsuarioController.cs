using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib.Mvc;
using zapweb.Models;

namespace zapweb.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class UsuarioController : zapweb.Lib.Mvc.Controller
    {
        public string Add(Usuario usuario) {
            var usuarioRules = new UsuarioRules();

            if (!usuarioRules.Adicionar(usuario)) {
                return Error(usuarioRules.MessageError);
            }

            return Success(usuario);
        }

        public string Update(Usuario usuario)
        {
            var usuarioRules = new UsuarioRules();

            if (!usuarioRules.Update(usuario))
            {
                return Error(usuarioRules.MessageError);
            }

            return Success(usuario);
        }

        public string Search(string nome) {
            var usuarioRules = new UsuarioRules();

            return Success(usuarioRules.Search(nome));
        }

        public string Get(int id) {
            var usuarioRules = new UsuarioRules();
            var usuario = usuarioRules.Get(id);

            if (usuario == null)
            {
                return Error(usuarioRules.MessageError);
            }

            return Success(usuario);
        }

        public string All(int unidadeId)
        {
            var usuarioRules = new UsuarioRules();

            return Success(usuarioRules.All(unidadeId));
        }
    }
}
