using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaAnexoRepositorio
    {
        public static void Insert(Despesa despesa, List<Arquivo> arquivos)
        {
            if (despesa == null) return;
            if (arquivos == null) return;

            foreach (var arquivo in arquivos)
            {
                Repositorio.GetInstance().Db.Insert("DespesaAnexo", "Id", new
                {
                    DespesaId = despesa.Id,
                    AnexoId = arquivo.Id
                });
            }
        }

        public static void Update(Despesa despesa, List<Arquivo> arquivos) {
            if (despesa == null) return;
            if (arquivos == null) return;

            DespesaAnexoRepositorio.Delete(despesa);
            DespesaAnexoRepositorio.Insert(despesa, arquivos);
        }

        public static List<Arquivo> FetchAnexos(Despesa despesa)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("INNER JOIN DespesaAnexo ON DespesaAnexo.AnexoId = Arquivo.Id")
                                          .Append("WHERE DespesaAnexo.DespesaId = @0", despesa.Id);

            return Repositorio.GetInstance().Db.Fetch<Arquivo>(sql);
        }

        public static void Delete(Despesa despesa)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM DespesaAnexo WHERE DespesaId = @0", despesa.Id);
        }        
    }
}