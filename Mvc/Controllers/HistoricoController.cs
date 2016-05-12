using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{
    [zapweb.Lib.Filters.IsAuthenticate]
    public class HistoricoController : zapweb.Lib.Mvc.Controller
    {

        public string Add(Historico historico)
        {
            var rules = new HistoricoRules();

            if (!rules.Adicionar(historico))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(historico);
        }

        public string All(int condominioId)
        {
            var rules = new HistoricoRules();

            return this.Success(rules.All(condominioId));
        }

        public string UpdateDate(Historico historico)
        {
            var rules = new HistoricoRules();

            rules.UpdateData(historico.Id, historico.ProximoContato);

            return this.Success(new { });
        }

    }
}