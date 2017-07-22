using HomeHUD.Models;
using HomeHUD.Services;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        //void SET_CURRENT_LIGHTS_STATE(LightsState allLights);
        void SetLightState(LightStateViewModel singleLightState);
        void SetAllLightsState(LightsStateViewModel lightsStateStateData);
        void SetLights(IEnumerable<LightViewModel> lights);
    }

    //[Authorize]
    public class ControlHub : Hub<IControlHub>
    {
        private readonly ILightSwitchService _lightSwitchService;

        public ControlHub(ILightSwitchService lightSwitchService)
        {
            _lightSwitchService = lightSwitchService;
        }

        public async Task SetLightState(LightStateViewModel lightState)
        {
            await _lightSwitchService.SetLightState(lightState);
        }

        public async Task SetAllLightsState(LightsStateViewModel lightsState)
        {
            await _lightSwitchService.SetLightsState(lightsState);
        }
    }
}