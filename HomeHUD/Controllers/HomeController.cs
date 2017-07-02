using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HomeHUD.Controllers
{
    public partial class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPathProvider _pathProvider;

        public HomeController(
            ApplicationDbContext context,
            IPathProvider pathProvider)
        {
            _context = context;
            _pathProvider = pathProvider;
        }

        public IActionResult Index()
        {
            var baseUrl = _pathProvider.GetAppBaseUrl();

            return View(new { baseUrl = baseUrl });
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
                   }).ToList();

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
