using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class NotificacaoUsuarioRepositorio
    {

        public static NotificacaoUsuario Insert(NotificacaoUsuario notificacaoUsuario) {
            if (notificacaoUsuario.Usuario != null)
            {
                notificacaoUsuario.UsuarioId = notificacaoUsuario.Usuario.Id;
            }

            Repositorio.GetInstance().Db.Insert(notificacaoUsuario);

            return notificacaoUsuario;
        }

        public static void Incremente(Usuario usuario) {
            Repositorio.GetInstance().Db.Execute("UPDATE NotificacaoUsuario SET Total = Total + 1 WHERE UsuarioId = @0", usuario.Id);
        }

        public static void UpdateLida(Usuario usuario) {
            Repositorio.GetInstance().Db.Execute("UPDATE NotificacaoUsuario SET Total = 0 WHERE UsuarioId = @0", usuario.Id);
        }

        public static NotificacaoUsuario FetchOne(Usuario usuario) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT NotificacaoUsuario.*")
                                          .Append("FROM NotificacaoUsuario")
                                          .Append("WHERE UsuarioId = @0", usuario.Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<NotificacaoUsuario>(sql);
        }
    }
}