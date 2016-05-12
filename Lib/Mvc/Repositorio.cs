using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using PetaPoco;

namespace zapweb.Lib.Mvc
{
    public class Repositorio
    {
        public Database Db { get; set; }

        public Repositorio()
        {
            if (System.Web.HttpContext.Current.Items["ModelDataContext"] == null)
            {
                System.Web.HttpContext.Current.Items["ModelDataContext"] = new PetaPoco.Database(zapweb.Lib.DataBaseParam.ConnectionString, zapweb.Lib.DataBaseParam.Provider);
            }

            this.Db = (PetaPoco.Database)System.Web.HttpContext.Current.Items["ModelDataContext"];
        }
        
        public static Repositorio GetInstance()
        {
            if (System.Web.HttpContext.Current.Items["RepositorioContext"] == null)
            {
                System.Web.HttpContext.Current.Items["RepositorioContext"] = new Repositorio();
            }

            return (Repositorio)System.Web.HttpContext.Current.Items["RepositorioContext"];
        }

        public static string UUID()
        {
            return Repositorio.GetInstance().Db.ExecuteScalar<string>("SELECT UUID();");
        }
        
    }


}