using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class HistoricoRepositorio
    {

        public static Historico Insert(Historico historico)
        {
            if (historico.Usuario != null)
            {
                historico.UsuarioId = historico.Usuario.Id;
            }

            if (historico.Condominio != null)
            {
                historico.CondominioId = historico.Condominio.Id;
            }

            Repositorio.GetInstance().Db.Insert(historico);

            return historico;
        }

        public static List<Historico> FetchByCondominioId(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Historico")
                                          .Append("WHERE Historico.CondominioId = @0", Id)
                                          .Append("ORDER BY Historico.ProximoContato DESC");

            return Repositorio.GetInstance().Db.Fetch<Historico>(sql);
        }

        public static List<Historico> Fetch(DateTime start, DateTime end, Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Historico.*, Condominio.*")
                                          .Append("FROM Historico")
                                          .Append("INNER JOIN Condominio ON Condominio.Id = Historico.CondominioId")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Condominio.UnidadeId")
                                          .Append("WHERE Historico.ProximoContato BETWEEN @0 AND @1", start, end)
                                          .Append("AND (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1)", unidade.GetFullLevelHierarquia() + "%", unidade.Id);

            return Repositorio.GetInstance().Db.Fetch<Historico, Condominio, Historico>((h, c)=> {

                h.Condominio = c;

                return h;
            }, sql);
        }

        public static void UpdateDate(int Id, DateTime data) {
            Repositorio.GetInstance().Db.Update("Historico", "Id", new {
                Id = Id,
                ProximoContato = data
            });
        }

    }
}