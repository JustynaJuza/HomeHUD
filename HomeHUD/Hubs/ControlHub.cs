using HomeHUD.Models;
using Microsoft.AspNet.SignalR;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        void SET_LIGHT_STATE(int lightId, LightSwitchState state);

        void SET_LIGHT_ON(int lightSwitchId);
        void SET_LIGHT_OFF(int lightSwitchId);
        void SET_ALL_LIGHTS_ON();
        void SET_ALL_LIGHTS_OFF();
        void SET_CURRENT_LIGHTS_STATE(LightsState lightState);
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


        public async void SetLightOn(int lightId)
        {
            // send request to set light

            // save changing state to db
            var switchingOn = _lightSwitchService.SetLightState(lightId, LightSwitchState.SwitchingOn);

            // trigger light changing on all clients
            Clients.All.SET_LIGHT_STATE(lightId, LightSwitchState.SwitchingOn);

            //await response for light on

            await switchingOn;
            // save new state to db
            var switchedOn = _lightSwitchService.SetLightState(lightId, LightSwitchState.On);

            // trigger light changed on all clients
            Clients.All.SET_LIGHT_STATE(lightId, LightSwitchState.On);

            await switchedOn;

        }

        public void SetLightOff(int lightId)
        {


        }

        public void SetAllLightsOn()
        {


        }


        public void SetAllLightsOff()
        {


        }
    }
}