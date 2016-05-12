using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{

    [zapweb.Lib.Filters.IsAuthenticate]
    public class VariavelController : zapweb.Lib.Mvc.Controller
    {

        public string Add(Variavel variavel) 
        {
            VariavelRepositorio.Insert(variavel);

            return Success(variavel);
        }

        public void Update(Variavel variavel)
        {
            VariavelRepositorio.Update(variavel);
        }

        public string All()
        {
            return Success(VariavelRepositorio.FetchPublics());
        }

    }
}