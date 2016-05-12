using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class SindicoController : zapweb.Lib.Mvc.Controller
    {

        public string Add(Sindico sindico)
        {
            var rules = new SindicoRules();

            return this.Success(rules.Adicionar(sindico));
        }

        public string SearchByNome(string nome)
        {
            var rules = new SindicoRules();

            return this.Success(rules.Search(nome));
        }

    }
}