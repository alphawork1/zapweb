using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class AgendaRepositorio
    {

        public static Agenda Insert(Agenda agenda)
        {
            if (agenda.Unidade != null)
            {
                agenda.UnidadeId = agenda.Unidade.Id;
            }

            if (agenda.Usuario != null)
            {
                agenda.UsuarioId = agenda.Usuario.Id;
            }
            
            Repositorio.GetInstance().Db.Insert(agenda);

            return agenda;
        }

        public static void UpdateData(Agenda agenda)
        {
            Repositorio.GetInstance().Db.Update("Agenda", "Id", new
            {
                Id = agenda.Id,
                Data = agenda.Data
            });
        }

        public static Agenda GetHorarioDisponivel(Agenda agenda)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Agenda.*")
                                          .Append("FROM Agenda")
                                          .Append("WHERE Agenda.UnidadeId = @0 AND Data = @1", agenda.UnidadeId, agenda.Data)
                                          .Append("ORDER BY Data DESC")
                                          .Append("LIMIT 1");

            return Repositorio.GetInstance().Db.SingleOrDefault<Agenda>(sql);
        }

        public static List<Agenda> Fetch(DateTime start, DateTime end, Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Agenda.*")
                                          .Append("FROM Agenda")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Agenda.UnidadeId")
                                          .Append("WHERE Agenda.Data BETWEEN @0 AND @1", start, end)
                                          .Append("AND (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1)", unidade.GetFullLevelHierarquia() + "%", unidade.Id);

            return Repositorio.GetInstance().Db.Fetch<Agenda>(sql);
        }

    }
}