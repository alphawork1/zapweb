using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class AgendaController : zapweb.Lib.Mvc.Controller
    {

        public string Feed(DateTime start, DateTime end, int unidadeId)
        {
            var rules = new AgendaRules();

            return this.Success(rules.Search(start, end, unidadeId));
        }

        public void Update(Agenda agenda)
        {
            var rules = new AgendaRules();

            rules.UpdateData(agenda);
        }

    }
}