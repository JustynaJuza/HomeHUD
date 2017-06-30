using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HomeHUD.Controllers
{
    public class RoomsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("/rooms/config")]
        public AppState GetRoomConfig()
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

            var lights = _context.Lights
                   .Select(x => new LightViewModel
                   {
                       Id = x.Id,
                       State = x.State,
                       Color = x.Color,
                       Brightness = x.Brightness,
                       Description = x.Description,
                       RoomId = x.RoomId
                   }).ToList();

            var initialState = new AppState
            {
                Config = new AppState.AppConfiguration
                {
                    Rooms = rooms
                },
                Lights = new LightsState
                {
                    All = lights
                }
            };

            return initialState;
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
