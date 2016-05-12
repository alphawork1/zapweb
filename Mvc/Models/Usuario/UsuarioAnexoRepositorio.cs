using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UsuarioAnexoRepositorio
    {        
        public static List<Arquivo> FetchAnexos(Usuario usuario)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Arquivo.*")
                                          .Append("FROM Arquivo")
                                          .Append("INNER JOIN UsuarioAnexo ON UsuarioAnexo.AnexoId = Arquivo.Id")
                                          .Append("WHERE UsuarioAnexo.UsuarioId = @0", usuario.Id);

            return Repositorio.GetInstance().Db.Fetch<Arquivo>(sql).ToList();
        }

        public static void Delete(Usuario usuario)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM UsuarioAnexo WHERE UsuarioId = @0", usuario.Id);
        }

        public static void UpdateAnexos(Usuario usuario)
        {
            if (usuario.Anexos == null) return;

            UsuarioAnexoRepositorio.Delete(usuario);

            foreach (var anexo in usuario.Anexos)
            {
                Repositorio.GetInstance().Db.Insert("UsuarioAnexo", "Id", new
                {
                    UsuarioId = usuario.Id,
                    AnexoId = anexo.Id
                });
            }
        }
    }
}