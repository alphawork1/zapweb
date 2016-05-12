using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CampanhaAnexoRepositorio
    {

        public static void Insert(Campanha campanha, List<Arquivo> arquivos)
        {
            if (campanha == null) return;
            if (arquivos == null) return;            

            foreach (var anexo in campanha.Anexos)
            {
                Repositorio.GetInstance().Db.Insert("CampanhaAnexo", "Id", new
                {
                    CampanhaId = campanha.Id,
                    AnexoId = anexo.Id
                });
            }
        }

        public static void Update(Campanha campanha, List<Arquivo> arquivos)
        {
            if (campanha == null) return;
            if (arquivos == null) return;

            CampanhaAnexoRepositorio.Delete(campanha);
            CampanhaAnexoRepositorio.Insert(campanha, arquivos);
        }

        public static void Delete(Campanha campanha)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM CampanhaAnexo WHERE CampanhaAnexo.CampanhaId = @0", campanha.Id);
        }

        public static List<Arquivo> FetchAnexos(Campanha campanha)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("INNER JOIN CampanhaAnexo ON CampanhaAnexo.AnexoId = Arquivo.Id")
                                          .Append("WHERE CampanhaAnexo.CampanhaId = @0", campanha.Id);

            return Repositorio.GetInstance().Db.Fetch<Arquivo>(sql);
        }
        
        public static void IncludeAnexos(List<Campanha> campanhas)
        {
            foreach (var campanha in campanhas)
            {
                campanha.Anexos = CampanhaAnexoRepositorio.FetchAnexos(campanha);
            }
        }

    }
}