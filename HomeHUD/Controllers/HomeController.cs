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
            return View(new
            {
                baseUrl = _pathProvider.GetAppBaseUrl(),
                isAuthenticated = User.Identity.IsAuthenticated
            });
        }

        [Route("/initialState")]
        public AppState InitialState()
        {
            var rooms = _context.Rooms
                   .Select(x => new RoomViewModel
                   {
                       Id = x.Id,
                       Name = x.Name,
                       Hash = x.Hash,
                       SortWeight = x.SortWeight,
                       Lights = x.RoomLights.Select(y => y.LightId)
                   }).ToList();

            var lights = _context.Lights
                .Select(y => new LightViewModel
                {
                    Id = y.Id,
                    State = y.State,
                    Color = y.Color,
                    Brightness = y.Brightness,
                    Description = y.Description
                }).ToList();

            return new AppState
            {
                Config = new AppState.AppConfiguration { Rooms = rooms },
                Lights = new LightsState { All = lights }
            };
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
