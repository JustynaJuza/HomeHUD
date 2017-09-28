using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;

namespace HomeHUD.Controllers
{
    public class RoomsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
