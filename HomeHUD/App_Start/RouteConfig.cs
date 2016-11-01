using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using HomeHUD.Models.Configurables;

namespace HomeHUD
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            MapCustomRoutes(routes);

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        public static void MapCustomRoutes(RouteCollection routes)
        {
            using (var context = new ApplicationDbContext())
            {
                var customRoutes = context.Set<Room>().Select(x => new { x.Name, x.Hash }).ToList();
                foreach (var route in customRoutes)
                {
                    routes.MapRoute(route.Name, route.Hash);
                }
            }
        }
    }
}
