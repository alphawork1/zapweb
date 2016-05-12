using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class NotificacaoRepositorio
    {
        public static Notificacao Insert(Notificacao notificacao)
        {
            if (notificacao.De != null)
            {
                notificacao.DeId = notificacao.De.Id;
            }

            if (notificacao.Para != null)
            {
                notificacao.ParaId = notificacao.Para.Id;
            }

            notificacao.Id = 0;

            Repositorio.GetInstance().Db.Insert(notificacao);

            return notificacao;
        }

        public static List<Notificacao> Fetch(int usuarioId, Paging paging) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Notificacao.*, De.*, Para.*, Unidade.*")
                                          .Append("FROM Notificacao")
                                          .Append("INNER JOIN Usuario AS De ON De.Id = Notificacao.DeId")
                                          .Append("INNER JOIN Usuario AS Para ON Para.Id = Notificacao.ParaId")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = De.UnidadeId")
                                          .Append("WHERE Notificacao.ParaId = @0", usuarioId)
                                          .Append("ORDER BY Notificacao.Data DESC")
                                          .Append("LIMIT @0, @1", paging.LimitDown, paging.LimitUp);

            return Repositorio.GetInstance().Db.Fetch<Notificacao, Usuario, Usuario, Unidade, Notificacao>((n, d, p, u) => {

                n.De = d;
                n.Para = p;
                n.De.Unidade = u;

                return n;
            }, sql).ToList();
        }

        public static void UpdateLida(Notificacao notificacao) {
            Repositorio.GetInstance().Db.Update("Notificacao", "Id", new {
                Id = notificacao.Id,
                Lida = notificacao.Lida
            });
        }

        public static void UpdateLidaByUsuario(Usuario usuario)
        {
            Repositorio.GetInstance().Db.Execute("UPDATE Notificacao SET Lida = 1 WHERE ParaId = @0", usuario.Id);
        }
    }
}