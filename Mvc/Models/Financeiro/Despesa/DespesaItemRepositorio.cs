using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaItemRepositorio
    {
        public static void Insert(Despesa despesa, List<FinanceiroItem> items)
        {
            if (despesa == null) return;
            if (items == null) return;

            FinanceiroItemRepositorio.Insert(items);

            foreach (var item in items)
            {
                Repositorio.GetInstance().Db.Insert("DespesaItem", "Id", new
                {
                    DespesaId = despesa.Id,
                    ItemId = item.Id
                });
            }
        }

        public static void Update(Despesa despesa, List<FinanceiroItem> items) {
            if (despesa == null) return;
            if (items == null) return;

            DespesaItemRepositorio.Delete(despesa);
            DespesaItemRepositorio.Insert(despesa, items);
        }

        public static List<FinanceiroItem> FetchItems(Despesa despesa)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT FinanceiroItem.*, CentroCusto.*")
                                          .Append("FROM FinanceiroItem")
                                          .Append("INNER JOIN DespesaItem ON DespesaItem.ItemId = FinanceiroItem.Id")
                                          .Append("INNER JOIN CentroCusto ON CentroCusto.Id = FinanceiroItem.CentroCustoId")
                                          .Append("WHERE DespesaItem.DespesaId = @0", despesa.Id);

            return Repositorio.GetInstance().Db.Fetch<FinanceiroItem, CentroCusto, FinanceiroItem>((f, c) =>
            {
                f.CentroCusto = c;

                return f;
            }, sql).ToList();
        }

        public static void Delete(Despesa despesa)
        {
            var sql = PetaPoco.Sql.Builder.Append("DELETE DespesaItem, FinanceiroItem")
                                          .Append("FROM DespesaItem")
                                          .Append("INNER JOIN FinanceiroItem ON FinanceiroItem.Id = DespesaItem.ItemId")
                                          .Append("WHERE DespesaItem.DespesaId = @0", despesa.Id);

            Repositorio.GetInstance().Db.Execute(sql);
        }        
    }
}