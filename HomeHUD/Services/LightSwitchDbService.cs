using HomeHUD.Models;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HomeHUD.Services
{
    public interface ILightSwitchDbService
    {
        bool AnyLightsToSwitchToTargetState(LightsStateViewModel lightsState);
        Task<int> SetLightState(LightStateViewModel lightState, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SetLightsState(LightsStateViewModel lightsState, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SetLights(IList<LightViewModel> lights);
    }

    public class LightSwitchDbService : ILightSwitchDbService
    {
        private readonly ApplicationDbContext _context;

        private bool wasFetchingLightsToSwitch;

        public LightSwitchDbService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool AnyLightsToSwitchToTargetState(LightsStateViewModel lightsState)
        {
            _context.Lights
                .Where(x => x.State != lightsState.State)
                .WhereFilterIsEmptyOrContains(x => x.Id, lightsState.LightIds)
                .Load();

            wasFetchingLightsToSwitch = true;
            return _context.Lights.Local.Any();
        }

        public async Task<int> SetLightState(LightStateViewModel lightState, CancellationToken cancellationToken)
        {
            var switchedLight = await _context.Lights.FindAsync(lightState.LightId);
            switchedLight.State = lightState.State;
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<int> SetLightsState(LightsStateViewModel lightsState, CancellationToken cancellationToken)
        {
            List<Light> lightsToSwitch;
            if (wasFetchingLightsToSwitch)
            {
                lightsToSwitch = _context.Lights.Local.ToList();
            }
            else
            {
                lightsToSwitch = _context.Lights
                    .Where(x => x.State != lightsState.State)
                    .WhereFilterIsEmptyOrContains(x => x.Id, lightsState.LightIds)
                    .ToList();
            }

            lightsToSwitch.ForEach(x => x.State = lightsState.State);
            return _context.SaveChangesAsync(cancellationToken);
        }

        public Task<int> SetLights(IList<LightViewModel> lights)
        {
            var lightEntities = _context.Lights
                .WhereFilterIsEmptyOrContains(x => x.Id, lights.Select(y => y.Id))
                .ToList();

            foreach (var light in lights)
            {
                var lightEntity = lightEntities.FirstOrDefault(x => x.Id == light.Id);
                lightEntity.State = light.State;
                lightEntity.Color = light.Color;
                lightEntity.Brightness = light.Brightness;
            }

            return _context.SaveChangesAsync();
        }
    }
}