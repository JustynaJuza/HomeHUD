using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HomeHUD.Controllers
{
    public partial class HomeController : Controller
    {
        private ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var rooms = _context.Rooms
                   .Select(x => new RoomViewModel
                   {
                       Id = x.Id,
                       Name = x.Name,
                       Hash = x.Hash,
                       SortWeight = x.SortWeight,
                       Lights = x.Lights.Select(y => y.Id)
                   }).ToArray();

            var initialState = new AppState
            {
                Config = new AppState.AppConfiguration
                {
                    Rooms = rooms
                }
            };

            var test = new { a = new { c = rooms }, b = rooms };
            //var z = new JsonResult(test);

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
