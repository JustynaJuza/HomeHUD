using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using System.Linq;
using System.Threading.Tasks;

namespace HomeHUD.Hubs
{
    public interface ILightSwitchService
    {
        LightsState GetCurrentLightsState();
        int[] GetLightsToSwitch(LightSwitchState state);
        Task<int> SetLightState(int lightId, LightSwitchState state);
        Task<int> SetAllLightsState(LightSwitchState state);
    }

    //[Authorize]
    public class LightSwitchService : ILightSwitchService
    {
        private readonly ApplicationDbContext _context;

        public LightSwitchService(ApplicationDbContext context)
        {
            _context = context;
        }

        public LightsState GetCurrentLightsState()
        {
            return new LightsState
            {
                All = _context.Set<Light>()
                    .Select(x => new LightViewModel
                    {
                        Id = x.Id,
                        State = x.State,
                        Color = x.Color,
                        RoomId = x.RoomId
                    }).ToList()
            };
        }

        public int[] GetLightsToSwitch(LightSwitchState state)
        {
            return _context.Set<Light>()
                   .Where(x => x.State != state)
                   .Select(x => x.Id)
                   .ToArray();
        }

        public async Task<int> SetLightState(int lightId, LightSwitchState state)
        {
            var switchedLight = await _context.Set<Light>().FindAsync(lightId);
            switchedLight.State = state;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> SetAllLightsState(LightSwitchState state)
        {
            _context.Set<Light>()
                .Where(x => x.State != state)
                .ToList()
                .ForEach(x => x.State = state);

            return await _context.SaveChangesAsync();
        }
    }
}