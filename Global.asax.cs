using System;
using System.Web.Routing;
using System.Web.Mvc;
using System.ComponentModel;
using System.Linq;

namespace zapweb
{

    public class NullStringModelBinder : DefaultModelBinder
    {

        protected override void SetProperty(ControllerContext controllerContext, ModelBindingContext bindingContext, PropertyDescriptor propertyDescriptor, object value)
        {
            if (propertyDescriptor.PropertyType == typeof(string))
            {
                if (value == null)
                {
                    base.SetProperty(controllerContext, bindingContext, propertyDescriptor, "");
                    return;
                }
            }

            base.SetProperty(controllerContext, bindingContext, propertyDescriptor, value);
        }

        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {            
            return base.BindModel(controllerContext, bindingContext);
        }
    }

    public class Global : System.Web.HttpApplication
    {
                
        protected void Application_Start(object sender, EventArgs e)
        {

            Pillar.Mvc.Application.Config("config.ini");

            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            RouteTable.Routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            ModelBinders.Binders.DefaultBinder = new NullStringModelBinder();

            var razorEngine = ViewEngines.Engines.OfType<RazorViewEngine>().First();
            razorEngine.ViewLocationFormats = razorEngine.ViewLocationFormats.Concat(new string[] {
                "~/Mvc/Views/{1}/{0}.cshtml"
            }).ToArray();
        }
    }
}