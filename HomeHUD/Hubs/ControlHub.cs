using HomeHUD.Models;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        //void SET_CURRENT_LIGHTS_STATE(LightsState allLights);
        void SetLightState(LightStateViewModel singleLightState);
        void SetAllLightsState(AllLightsStateViewModel lightsStateStateData);
    }

    //[Authorize]
    public class ControlHub : Hub<IControlHub>
    {
        private readonly ILightSwitchService _lightSwitchService;

        public ControlHub(ILightSwitchService lightSwitchService)
        {
            _lightSwitchService = lightSwitchService;
        }

        //public void GET_CURRENT_LIGHTS_STATE()
        //{
        //    Clients.Caller.SET_CURRENT_LIGHTS_STATE(_lightSwitchService.GetCurrentLightsState());
        //}

        public async Task<int> SetLightState(LightStateViewModel lightState)
        {
            // send request to set light
            // save changing state to db
            // trigger light changing on all clients
            //await response for light on
            // save new state to db
            // trigger light changed on all clients

            var transition = GetLightSwitchTransition(lightState.State);

            var switching = _lightSwitchService.SetLightState(lightState.LightId, transition[0]);
            Clients.All.SetLightState(new LightStateViewModel
            {
                LightId = lightState.LightId,
                State = transition[0]
            });


            await switching;
            var switched = _lightSwitchService.SetLightState(lightState.LightId, transition[1]);
            Clients.All.SetLightState(new LightStateViewModel
            {
                LightId = lightState.LightId,
                State = transition[1]
            });

            return await switched;
        }

        public async Task<int> SetAllLightsState(AllLightsStateViewModel allLightsState)
        {
            // send request to set light
            // save changing state to db
            // trigger light changing on all clients
            //await response for light on
            // save new state to db
            // trigger light changed on all clients

            var lightsToSwitch = _lightSwitchService.GetLightsToSwitch(allLightsState);

            // if nothing needs switching return a completed task
            if (!lightsToSwitch.Any())
                return await Task.FromResult(1);

            var transition = GetLightSwitchTransition(allLightsState.State);

            var switching = _lightSwitchService.SetAllLightsState(lightsToSwitch, transition[0]);

            var lightsState = new AllLightsStateViewModel
            {
                LightIds = lightsToSwitch,
                State = transition[0]
            };
            Clients.All.SetAllLightsState(lightsState);


            await switching;
            var switched = _lightSwitchService.SetAllLightsState(lightsToSwitch, transition[1]);
            lightsState.State = transition[1];
            Clients.All.SetAllLightsState(lightsState);

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