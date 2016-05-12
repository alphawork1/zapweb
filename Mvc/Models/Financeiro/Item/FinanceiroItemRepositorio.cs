using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class FinanceiroItemRepositorio
    {
        public static void Insert(List<FinanceiroItem> items) {

            if (items == null) return;

            foreach (var item in items)
            {
                if (item.CentroCusto != null)
                {
                    item.CentroCustoId = item.CentroCusto.Id;
                }

                Repositorio.GetInstance().Db.Insert(item);
            }
        }
    }
}