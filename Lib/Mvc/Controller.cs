using Pillar.Util;
using zapweb.Models;
using Newtonsoft.Json;

namespace zapweb.Lib.Mvc
{
    public class Controller : System.Web.Mvc.Controller
    {
        public string Success(object data)
        {
            return JsonConvert.SerializeObject(Wrapper.Ok(data));
        }

        public string Success(object data, Paging paging)
        {
            return JsonConvert.SerializeObject(Wrapper.Ok(data, paging));
        }

        public string Error(string message)
        {
            return JsonConvert.SerializeObject(Wrapper.Error(message));
        }

        public string Raw(object data)
        {
            return JsonConvert.SerializeObject(data);
        }
    }
}