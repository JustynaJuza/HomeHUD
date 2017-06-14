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
            return View();
        }

        [Route("/initialState")]
        public AppState InitialState()
        {
            var query = _context.Rooms
                   .Select(x => new
                   {
                       Id = x.Id,
                       Name = x.Name,
                       Hash = x.Hash,
                       SortWeight = x.SortWeight,
                       Lights = x.Lights.Select(y => new LightViewModel
                       {
                           Id = y.Id,
                           State = y.State,
                           Color = y.Color,
                           Brightness = y.Brightness,
                           Description = y.Description,
                           RoomId = y.RoomId
                       })
                   }).ToArray();

            //var rooms = _context.Rooms
            //       .Select(x => new RoomViewModel
            //       {
            //           Id = x.Id,
            //           Name = x.Name,
            //           Hash = x.Hash,
            //           SortWeight = x.SortWeight,
            //           Lights = x.Lights.Select(y => y.Id)
            //       }).ToArray();

            //var lights = _context.Lights
            //       .Select(x => new LightViewModel
            //       {
            //           Id = x.Id,
            //           State = x.State,
            //           Color = x.Color,
            //           Brightness = x.Brightness,
            //           Description = x.Description,
            //           RoomId = x.RoomId
            //       }).ToList();

            var initialState = new AppState
            {
                Config = new AppState.AppConfiguration
                {
                    Rooms = query.Select(x => new RoomViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Hash = x.Hash,
                        SortWeight = x.SortWeight,
                        Lights = x.Lights.Select(y => y.Id)
                    }).ToArray()
                },
                Lights = new LightsState
                {
                    All = query.SelectMany(x => x.Lights).ToList()
                }
            };

            return initialState;
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
