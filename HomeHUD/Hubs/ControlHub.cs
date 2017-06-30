using HomeHUD.Models;
using HomeHUD.Services;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        //void SET_CURRENT_LIGHTS_STATE(LightsState allLights);
        void SetLightState(LightStateViewModel singleLightState);
        void SetAllLightsState(AllLightsStateViewModel lightsStateStateData);
        void SetLightsState(IEnumerable<Light> lightsState);
    }

    //[Authorize]
    public class ControlHub : Hub<IControlHub>
    {
        private readonly ILightSwitchService _lightSwitchService;
        private readonly IRabbitMqService _queueService;

        public ControlHub(
            ILightSwitchService lightSwitchService,
            IRabbitMqService queueService)
        {
            _lightSwitchService = lightSwitchService;
            _queueService = queueService;
        }


        public async Task SetLightState(LightStateViewModel lightState)
        {
            var transition = GetLightSwitchTransition(lightState.State);
            lightState.State = transition[0];

            // trigger light changing on all clients to disable switch
            Clients.All.SetLightState(lightState);

            // save new state to db so new requests fetch updated state
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;
            var saving = _lightSwitchService.SetLightState(lightState.LightId, transition[0], cancellationToken);

            // send request to set light
            var transitionRequestSent = _queueService.SendLightState(lightState.LightId, transition[1]);
            if (!transitionRequestSent)
            {
                // could not send transition request, rollback all actions
                cancellationTokenSource.Cancel();
            }

            await saving;
        }

        public async Task SetAllLightsState(AllLightsStateViewModel lightsState)
        {
            //var lightsToSwitch = _lightSwitchService.GetLightsToSwitch(allLightsState);

            //// if nothing needs switching return
            //if (!lightsToSwitch.Any())
            //    return;

            var transition = GetLightSwitchTransition(lightsState.State);
            lightsState.State = transition[0];

            // trigger light changing on all clients to disable switch
            Clients.All.SetAllLightsState(lightsState);

            // save new state to db so new requests fetch updated state
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;
            var saving = _lightSwitchService.SetAllLightsState(lightsState.LightIds, transition[0], cancellationToken);

            // send request to set light
            var transitionRequestSent = _queueService.SendLightsState(lightsState.LightIds, transition[1]);
            if (!transitionRequestSent)
            {
                // could not send transition request, rollback all actions
                cancellationTokenSource.Cancel();
            }

            await saving;
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