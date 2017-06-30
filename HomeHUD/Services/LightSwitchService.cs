using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HomeHUD.Services
{
    public interface ILightSwitchService
    {
        LightsState GetCurrentLightsState();
        int[] GetLightsToSwitch(AllLightsStateViewModel expectedLightsState);
        Task<int> SetLightState(int lightId, LightSwitchState state, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SetAllLightsState(IList<int> lightIds, LightSwitchState state, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SetLightsState(IList<Light> lights);
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

        public async Task<int> SetAllLightsState(IList<int> lightIds, LightSwitchState state, CancellationToken cancellationToken)
        {
            _context.Lights
                .Where(x => x.State != state)
                .Where(x => lightIds.Contains(x.Id))
                .ToList()
                .ForEach(x => x.State = state);

            return await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<int> SetLightsState(IList<Light> lights)
        {
            _context.Lights
                .WhereFilterIsEmptyOrContains(x => x.Id, lights.Select(y => y.Id))
                .ToList()
                .ForEach(x =>
                {
                    var source = lights.First(y => y.Id == x.Id);
                    x.SetPropertyFrom(source, y => y.State);
                });

            return await _context.SaveChangesAsync();
        }
    }
}