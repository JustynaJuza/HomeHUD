using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HomeHUD.Hubs
{
    public interface ILightSwitchService
    {
        LightsState GetCurrentLightsState();
        int[] GetLightsToSwitch(AllLightsStateViewModel expectedLightsState);
        Task<int> SetLightState(int lightId, LightSwitchState state, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SetAllLightsState(IEnumerable<int> lightIds, LightSwitchState state, CancellationToken cancellationToken = default(CancellationToken));
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
                All = _context.Lights
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
            return _context.Lights
                   .Where(x => x.State != expectedLightsState.State)
                   .WhereFilterIsEmptyOrContains(x => x.Id, expectedLightsState.LightIds)
                   .Select(x => x.Id)
                   .ToArray();
        }

        public async Task<int> SetLightState(int lightId, LightSwitchState state, CancellationToken cancellationToken)
        {
            var switchedLight = await _context.Lights.FindAsync(lightId);
            if (switchedLight.State != state)
            {
                switchedLight.State = state;
                return await _context.SaveChangesAsync(cancellationToken);
            }

            return await Task.FromResult(1);
        }

        public async Task<int> SetAllLightsState(IEnumerable<int> lightIds, LightSwitchState state, CancellationToken cancellationToken)
        {
            _context.Lights
                .Where(x => x.State != state)
                .Where(x => lightIds.Contains(x.Id))
                .ToList()
                .ForEach(x => x.State = state);

            return await _context.SaveChangesAsync(cancellationToken);
        }

        //public async Task<int> SetAllLightsState(LightSwitchState state)
        //{
        //    _context.Lights
        //        .Where(x => x.State != state)
        //        .ToList()
        //        .ForEach(x => x.State = state);

        //    return await _context.SaveChangesAsync();
        //}

    }
}