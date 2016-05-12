using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class NotificacaoRules
    {
        public void SendToUnidade(Notificacao notificacao, int unidadeId) {
            var accounts = AccountRepositorio.FetchByUnidadeId(unidadeId);            
            var notificacaoUsuarioRepositorio = new NotificacaoUsuarioRepositorio();

            foreach (var account in accounts)
            {
                notificacao.Para = account.Usuario;
                NotificacaoRepositorio.Insert(notificacao);
                NotificacaoUsuarioRepositorio.Incremente(notificacao.Para);

                //foreach (var session in account.Sessions)
                //{
                //    var realTime = realTimeRepositorio.Fetch(session.Presence);
                //    if (realTime != null)
                //    {
                //        Pillar.RealTime.RealTime.SendMessage(realTime.ConnectionId, new Pillar.RealTime.Protocol()
                //        {
                //            Event = "new::notificacao",
                //            Data = notificacao
                //        });
                //    }

                //}
            }
        }

        public void MarcarLida(int Id) {
            NotificacaoRepositorio.UpdateLida(new Notificacao() {
                Id = Id,
                Lida = true
            });
        }

        public void MarcarLida()
        {
            NotificacaoUsuarioRepositorio.UpdateLida(zapweb.Lib.Session.GetInstance().Account.Usuario);
        }

        public NotificacaoUsuario Get() {
            return NotificacaoUsuarioRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario);
        }

        public List<Notificacao> All(Paging paging) {
            return NotificacaoRepositorio.Fetch(zapweb.Lib.Session.GetInstance().Account.UsuarioId, paging);
        }

        public void TodasLida()
        {
            NotificacaoRepositorio.UpdateLidaByUsuario(zapweb.Lib.Session.GetInstance().Account.Usuario);
        }
    }
}