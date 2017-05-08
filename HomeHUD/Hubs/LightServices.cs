using HomeHUD.Models.Configurables;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeHUD.Models.Extensions;
using HomeHUD.Data;

namespace HomeHUD.Hubs
{
    public interface ILightSwitchService
    {
        LightsState GetCurrentLightsState();
        int[] GetLightsToSwitch(AllLightsStateViewModel expectedLightsState);
        Task<int> SetLightState(int lightId, LightSwitchState state);
        Task<int> SetAllLightsState(IEnumerable<int> lightIds, LightSwitchState state);
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

        public int[] GetLightsToSwitch(AllLightsStateViewModel expectedLightsState)
        {
            return _context.Set<Light>()
                   .Where(x => x.State != expectedLightsState.State)
                   .FilterBy(expectedLightsState.LightIds, x => x.Id)
                   .Select(x => x.Id)
                   .ToArray();
        }

        public async Task<int> SetLightState(int lightId, LightSwitchState state)
        {
            var switchedLight = await _context.Set<Light>().FindAsync(lightId);
            if (switchedLight.State != state)
            {
                switchedLight.State = state;
                return await _context.SaveChangesAsync();
            }

            return await Task.FromResult(1);
        }

        public async Task<int> SetAllLightsState(IEnumerable<int> lightIds, LightSwitchState state)
        {
            _context.Set<Light>()
                .Where(x => x.State != state)
                .FilterBy(lightIds, x => x.Id)
                .ToList()
                .ForEach(x => x.State = state);

            return await _context.SaveChangesAsync();
        }

        //public async Task<int> SetAllLightsState(LightSwitchState state)
        //{
        //    _context.Set<Light>()
        //        .Where(x => x.State != state)
        //        .ToList()
        //        .ForEach(x => x.State = state);

        //    return await _context.SaveChangesAsync();
        //}

    }
}