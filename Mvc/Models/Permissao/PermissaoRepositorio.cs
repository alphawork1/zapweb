using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class PermissaoRepositorio
    {

        public static void Insert(GrupoPermissao grupo) {

            if (grupo == null) return;
            if (grupo.Permissoes == null) return;

            for (int i = 0; i < grupo.Permissoes.Count; i++)
            {
                grupo.Permissoes[i].GrupoId = grupo.Id;
                Repositorio.GetInstance().Db.Insert(grupo.Permissoes[i]);
            }
        }

        public static List<Permissao> Fetch(int grupoId)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Permissao")
                                          .Append("WHERE GrupoId = @0", grupoId);

            return Repositorio.GetInstance().Db.Fetch<Permissao>(sql);
        }
        
        public static void DeleteByGrupoId(int grupoId){
            Repositorio.GetInstance().Db.Execute("DELETE FROM Permissao WHERE GrupoId = @0", grupoId);
        }

    }
}