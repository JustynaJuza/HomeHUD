using HomeHUD.Models;
using Microsoft.AspNet.SignalR;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using HomeHUD.Models.Configurables;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        void SET_CURRENT_LIGHTS_STATE(LightsState allLights);
        void SET_LIGHT_STATE(LightStateViewModel singleLightState);
        void SET_ALL_LIGHTS_STATE(SwitchAllLightsViewModel lightsStateData);
    }

    //[Authorize]
    public class ControlHub : Hub<IControlHub>
    {
        private readonly ILightSwitchService _lightSwitchService;

        public ControlHub(ILightSwitchService lightSwitchService)
        {
            _lightSwitchService = lightSwitchService;
        }

        public void GET_CURRENT_LIGHTS_STATE()
        {
            Clients.Caller.SET_CURRENT_LIGHTS_STATE(_lightSwitchService.GetCurrentLightsState());
        }


        public async Task<int> SetLightOn(int lightId)
        {
            return await SetLightState(lightId, LightSwitchState.On);
        }

        public async Task<int> SetLightOff(int lightId)
        {
            return await SetLightState(lightId, LightSwitchState.Off);
        }

        public async Task<int> SetAllLightsOn()
        {
            return await SetAllLightsState(LightSwitchState.On);
        }


        public async Task<int> SetAllLightsOff()
        {
            return await SetAllLightsState(LightSwitchState.Off);
        }


        private async Task<int> SetLightState(int lightId, LightSwitchState state)
        {
            // send request to set light
            // save changing state to db
            // trigger light changing on all clients
            //await response for light on
            // save new state to db
            // trigger light changed on all clients

            var transition = GetLightSwitchTransition(state);

            var switching = _lightSwitchService.SetLightState(lightId, transition[0]);
            Clients.All.SET_LIGHT_STATE(new LightStateViewModel
            {
                LightId = lightId,
                State = transition[0]
            });


            await switching;
            var switched = _lightSwitchService.SetLightState(lightId, transition[1]);
            Clients.All.SET_LIGHT_STATE(new LightStateViewModel
            {
                LightId = lightId,
                State = transition[1]
            });

            return await switched;
        }

        private async Task<int> SetAllLightsState(LightSwitchState state)
        {
            // send request to set light
            // save changing state to db
            // trigger light changing on all clients
            //await response for light on
            // save new state to db
            // trigger light changed on all clients

            var lightsToSwitch = _lightSwitchService.GetLightsToSwitch(state);

            // if nothing needs switching return a completed task
            if (!lightsToSwitch.Any())
                return await Task.FromResult(1);

            var transition = GetLightSwitchTransition(state);

            var switching = _lightSwitchService.SetAllLightsState(transition[0]);

            var lightsStateData = new SwitchAllLightsViewModel
            {
                LightIds = lightsToSwitch,
                State = transition[0]
            };
            Clients.All.SET_ALL_LIGHTS_STATE(lightsStateData);


            await switching;
            var switched = _lightSwitchService.SetAllLightsState(transition[1]);
            lightsStateData.State = transition[1];
            Clients.All.SET_ALL_LIGHTS_STATE(lightsStateData);

            return await switched;
        }

        private LightSwitchState[] GetLightSwitchTransition(LightSwitchState state)
        {
            switch (state)
            {
                case LightSwitchState.On:
                    return new[] { LightSwitchState.SwitchingOn, LightSwitchState.On };
                case LightSwitchState.Off:
                    return new[] { LightSwitchState.SwitchingOff, LightSwitchState.Off };
            }

            throw new InvalidEnumArgumentException(nameof(state), (int) state, typeof(LightSwitchState));
        }
    }
}