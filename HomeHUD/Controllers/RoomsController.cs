using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeHUD.Controllers
{
    public class RoomsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/rooms/list")]
        public async Task<IEnumerable<RoomViewModel>> GetList()
        {
            return await _context.Set<Room>().Select(x => new RoomViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Hash = x.Hash,
                SortWeight = x.SortWeight,
                Lights = x.RoomLights.Select(y => y.LightId)
            }).ToListAsync();
        }

    }
}
