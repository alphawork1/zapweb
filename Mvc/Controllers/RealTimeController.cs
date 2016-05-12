using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Models;

namespace zapweb.Mvc.Controllers
{
    public class RealTimeController : zapweb.Lib.Mvc.Controller
    {
        public void Set(string connectionId) {
            var realtime = RealTimeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Presence);
            if (realtime == null)
            {
                realtime = new RealTime()
                {
                    ConnectionId = connectionId,
                    SessionId = zapweb.Lib.Session.GetInstance().Presence
                };

                RealTimeRepositorio.Insert(realtime);
            }
            else {
                realtime.ConnectionId = connectionId;
                RealTimeRepositorio.Update(realtime);
            }
        }

    }
}
