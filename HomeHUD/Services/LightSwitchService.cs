using HomeHUD.Hubs;
using HomeHUD.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;

namespace HomeHUD.Services
{
    public interface ILightSwitchService
    {
        Task SetLightState(LightStateViewModel lightState);
        Task SetLightsState(LightsStateViewModel lightsState);
        Task SetLights(IList<LightViewModel> lights);
    }

    //[Authorize]
    public class LightSwitchService : ILightSwitchService
    {
        private readonly ILightSwitchDbService _lightSwitchDbService;
        private readonly IRabbitMqService _queueService;
        private readonly IHubContext<ControlHub, IControlHub> _controlHub;

        public LightSwitchService(
            ILightSwitchDbService lightSwitchDbService,
            IRabbitMqService queueService,
            IConnectionManager connectionManager)
        {
            _lightSwitchDbService = lightSwitchDbService;
            _queueService = queueService;
            _controlHub = connectionManager.GetHubContext<ControlHub, IControlHub>();
        }

        public async Task SetLightState(LightStateViewModel lightState)
        {
            var transition = GetLightSwitchTransition(lightState.State);
            lightState.State = transition[0];

            // trigger light changing on all clients to disable switch
            _controlHub.Clients.All.SetLightState(lightState);

            // save new state to db so new requests fetch updated state
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;
            var saving = _lightSwitchDbService.SetLightState(lightState, cancellationToken);

            // send request to set light
            lightState.State = transition[1];
            var transitionRequestSent = _queueService.SendLightState(lightState);
            if (!transitionRequestSent)
            {
                // could not send transition request, rollback all actions
                cancellationTokenSource.Cancel();
            }

            await saving;
        }

        public async Task SetLightsState(LightsStateViewModel lightsState)
        {
            if (!_lightSwitchDbService.AnyLightsToSwitchToTargetState(lightsState))
                return;

            var transition = GetLightSwitchTransition(lightsState.State);
            lightsState.State = transition[0];

            // trigger light changing on all clients to disable switch
            _controlHub.Clients.All.SetAllLightsState(lightsState);

            // save new state to db so new requests fetch updated state
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;
            var saving = _lightSwitchDbService.SetLightsState(lightsState, cancellationToken);

            // send request to set lights
            lightsState.State = transition[1];
            var transitionRequestSent = _queueService.SendLightsState(lightsState.LightIds, transition[1]);
            if (!transitionRequestSent)
            {
                // could not send transition request, rollback all actions
                cancellationTokenSource.Cancel();
            }

            await saving;
        }

        public async Task SetLights(IList<LightViewModel> lights)
        {
            _controlHub.Clients.All.SetLights(lights);
            await _lightSwitchDbService.SetLights(lights);
        }

        /// <summary>
        /// This method retrieves the transition array for a light switch for the given target state,
        /// i.e. to reach a target state of 'On' first a 'SwitchingOn' state must be processed,
        /// so it will be included in the array earlier than the target state.
        /// </summary>
        /// <param name="state"></param>
        /// <returns></returns>
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