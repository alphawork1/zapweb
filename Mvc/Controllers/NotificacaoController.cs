using Pillar.Util;
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
    public class NotificacaoController : zapweb.Lib.Mvc.Controller
    {
        public string All(int? totalPerPage, int? page) {
            int tp = totalPerPage == null ? 10 : (int)totalPerPage;
            int pg = page == null ? 1 : (int)page;

            var notificacaoRules = new NotificacaoRules();
            var paging = new Paging()
            {
                totalPerPage = tp,
                page = pg
            };

            return Success(notificacaoRules.All(paging));
        }

        public string Lida(int Id)
        {
            var notificacaoRules = new NotificacaoRules();

            notificacaoRules.MarcarLida(Id);

            return Success(new { });
        }

        public string Clear()
        {
            var notificacaoRules = new NotificacaoRules();

            notificacaoRules.MarcarLida();

            return Success(new { });
        }
        
        public string Total()
        {
            var notificacaoRules = new NotificacaoRules();

            return Success(notificacaoRules.Get());
        }

        public string TodasLida() {
            var notificacaoRules = new NotificacaoRules();

            notificacaoRules.TodasLida();

            return Success(new { });
        }
    }
}
