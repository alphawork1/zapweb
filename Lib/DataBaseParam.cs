using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Lib
{
    public class DataBaseParam
    {
        private static string DataBase {
            get {                
                return HttpContext.Current.Request.IsLocal ? "DataBase Local" : "DataBase Remote";
            }
        }

        public static string ConnectionString {
            get {
                var ini = new Pillar.Util.IniFile(HttpContext.Current.Server.MapPath("~/App_Data/config.ini"));
                return ini.Read(DataBase, "ConnectionString");
            }
        }

        public static string Provider { 
            get {
                var ini = new Pillar.Util.IniFile(HttpContext.Current.Server.MapPath("~/App_Data/config.ini"));
                return ini.Read(DataBase, "Provider");
            } 
        }
    }
}