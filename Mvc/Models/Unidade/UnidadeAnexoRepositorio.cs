using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UnidadeAnexoRepositorio
    {
        
        public static List<Arquivo> FetchAnexos(Unidade unidade) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("INNER JOIN UnidadeAnexo ON UnidadeAnexo.AnexoId = Arquivo.Id")
                                          .Append("WHERE UnidadeAnexo.UnidadeId = @0", unidade.Id);

            return Repositorio.GetInstance().Db.Fetch<Arquivo>(sql).ToList();
        }

        public static void Delete(Unidade unidade)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM UnidadeAnexo WHERE UnidadeId = @0", unidade.Id);
        }

        public static void UpdateAnexos(Unidade unidade)
        {
            if (unidade.Anexos == null) return;

            UnidadeAnexoRepositorio.Delete(unidade);

            foreach (var anexo in unidade.Anexos)
            {
                Repositorio.GetInstance().Db.Insert("UnidadeAnexo", "Id", new
                {
                    UnidadeId = unidade.Id,
                    AnexoId = anexo.Id
                });
            }
        }
        
    }
}