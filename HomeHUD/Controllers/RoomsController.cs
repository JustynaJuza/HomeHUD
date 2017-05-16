using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HomeHUD.Controllers
{
    public class RoomsController : Controller
    {
        private ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("/rooms/config")]
        public IActionResult GetRoomConfig()
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

            return new JsonResult(initialState);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
