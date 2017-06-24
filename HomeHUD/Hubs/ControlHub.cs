using HomeHUD.Models;
using HomeHUD.Services;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel;
using System.Linq;
using System.Threading;
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
        private readonly IRabbitMqService _queueService;

        public ControlHub(
            ILightSwitchService lightSwitchService,
            IRabbitMqService queueService)
        {
            _lightSwitchService = lightSwitchService;
            _queueService = queueService;
        }

        //public void GET_CURRENT_LIGHTS_STATE()
        //{
        //    Clients.Caller.SET_CURRENT_LIGHTS_STATE(_lightSwitchService.GetCurrentLightsState());
        //}


        //public LightChangeBackgroundTasks()
        //{


        //}


        public async Task SetLightState(LightStateViewModel lightState)
        {
            // save changing state to db
            //await response for light on
            // save new state to db
            // trigger light changed on all clients

            var transitionSequence = GetLightSwitchTransition(lightState.State);

            foreach (var transition in transitionSequence)
            {
                // trigger light changing on all clients to disable switch
                Clients.All.SetLightState(new LightStateViewModel
                {
                    LightId = lightState.LightId,
                    State = transition
                });

                // save new state to db so new requests fetch updated state
                var cancellationTokenSource = new CancellationTokenSource();
                var cancellationToken = cancellationTokenSource.Token;
                var saving = _lightSwitchService.SetLightState(lightState.LightId, transition, cancellationToken);

                // send request to set light
                var transitionRequestSent = _queueService.SendLightState(lightState.LightId, transition);
                if (!transitionRequestSent)
                {
                    // could not send transition request, rollback all actions
                    cancellationTokenSource.Cancel();
                }

                await saving;
            }
        }

        public async Task SetAllLightsState(AllLightsStateViewModel allLightsState)
        {
            var lightsToSwitch = _lightSwitchService.GetLightsToSwitch(allLightsState);

            // if nothing needs switching return
            if (!lightsToSwitch.Any())
                return;

            var transitionSequence = GetLightSwitchTransition(allLightsState.State);
            var lightsState = new AllLightsStateViewModel
            {
                LightIds = lightsToSwitch
            };

            foreach (var transition in transitionSequence)
            {
                // trigger light changing on all clients to disable switch
                lightsState.State = transition;
                Clients.All.SetAllLightsState(lightsState);

                // save new state to db so new requests fetch updated state
                var cancellationTokenSource = new CancellationTokenSource();
                var cancellationToken = cancellationTokenSource.Token;
                var saving = _lightSwitchService.SetAllLightsState(lightsToSwitch, transition, cancellationToken);

                // send request to set light
                var transitionRequestSent = _queueService.SendLightsState(lightsToSwitch, transition);
                if (!transitionRequestSent)
                {
                    // could not send transition request, rollback all actions
                    cancellationTokenSource.Cancel();
                }

                await saving;
            }
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