using HomeHUD.Models;
using HomeHUD.Models.Configurables;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Json;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace HomeHUD.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IAppSettingsService _appSettings;

        public HomeController(ApplicationDbContext context,
            IAppSettingsService appSettings)
        {
            _context = context;
            _appSettings = appSettings;
        }

        public ActionResult Index()
        {
            var rooms = _context.Set<Room>()
                   .Include(x => x.Lights)
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

        public ActionResult Login(LoginViewModel data)
        {
            var result = new JsonFormResult();

            if (!ModelState.IsValid)
            {
                result.MapErrorsFromModelState(ModelState);
                return Json(result);
            }

            var password = _appSettings.Get("genericPassword");

            if (!data.Password.Equals(password))
            {
                result.errors.Add(new FormError
                {
                    errorMessage = "Nope, what you entered will not allow you to log in."
                });
                return Json(result);
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, data.UserName)
            };

            var id = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

            var ctx = Request.GetOwinContext();
            var authenticationManager = ctx.Authentication;
            authenticationManager.SignIn(id);

            result.success = true;
            return Json(result);
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