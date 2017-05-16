using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HomeHud.Controllers
{
    public class RoomsController : Controller
    {
        private ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult GetRoomConfig()
        {

            var rooms = _context.Rooms
                   .Select(x => new RoomViewModel
                   {
                       id = x.Id,
                       name = x.Name,
                       hash = x.Hash,
                       sortWeight = x.SortWeight,
                       lights = x.Lights.Select(y => y.Id)
                   }).ToList();

            return View(rooms);

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
