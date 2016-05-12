using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

using zapweb.Lib;

namespace zapweb.Lib.Filters
{
    public class IsAuthenticate : ActionFilterAttribute, IActionFilter
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!Session.GetInstance().Exist())
            {
                var result = new JsonResult();

                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                result.Data = Pillar.Util.Wrapper.Alert(401, "logout");

                filterContext.Result = result;

                return;
            }

            base.OnActionExecuting(filterContext);
        }
    }
}