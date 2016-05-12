using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using zapweb.Lib;
using zapweb.Lib.Mvc;
using zapweb.Models;

namespace zapweb.Controllers
{    
    public class HomeController : zapweb.Lib.Mvc.Controller
    {
        //
        // GET: /Home/        
        public ActionResult Index()
        {            
            return View();
        }

    }
}
