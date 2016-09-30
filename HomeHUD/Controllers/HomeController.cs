using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace HomeHUD.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            var rooms = _context.Set<Room>()
                   .Include(x => x.Lights)
                   .Select(x => new RoomViewModel
                   {
                       id = x.Id,
                       name = x.Name,
                       lights = x.Lights.Select(y => y.Id)
                       //                    Lights = x.Lights.Select(y => new LightViewModel
                       //                    {
                       //                        Id = y.Id,
                       //                        Color = y.Color,
                       //                        RoomId = y.RoomId,
                       //                        State = y.State
                       //                    })
                   }).ToList();

            return View(rooms);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult GetConfigSettings()
        {
            var rooms = _context.Set<Room>()
                .Include(x => x.Lights)
                .Select(x => new RoomViewModel
                {
                    id = x.Id,
                    name = x.Name,
                    lights = x.Lights.Select(y => y.Id)
                    //                    Lights = x.Lights.Select(y => new LightViewModel
                    //                    {
                    //                        Id = y.Id,
                    //                        Color = y.Color,
                    //                        RoomId = y.RoomId,
                    //                        State = y.State
                    //                    })
                }).ToList();

            return new JsonCamelCaseResult(rooms);
        }
    }
}