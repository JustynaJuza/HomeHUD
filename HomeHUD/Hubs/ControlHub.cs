using HomeHUD.Models;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;

namespace HomeHUD.Hubs
{
    public interface IControlHub
    {
        void SET_LIGHT_ON(int lightSwitchId);
        void SET_LIGHT_OFF(int lightSwitchId);
        void SET_ALL_LIGHTS_ON();
        void SET_ALL_LIGHTS_OFF();
        void SET_CURRENT_LIGHTS_STATE(JsonCamelCaseResult lightState);
    }

    //[Authorize]
    public class ControlHub : Hub<IControlHub>
    {
        public void GET_CURRENT_LIGHTS_STATE()
        {
            var currentState = new LightsState
            {
                All = new List<LightSwitchViewModel>
                {
                    new LightSwitchViewModel
                    {
                        Id = 111,
                        State = LightSwitchState.On,
                        RoomIndex = 1
                    },

                    new LightSwitchViewModel
                    {
                        Id = 112,
                        State = LightSwitchState.SwitchingOff,
                        RoomIndex = 1
                    },

                    new LightSwitchViewModel
                    {
                        Id = 222,
                        State = LightSwitchState.Off,
                        RoomIndex = 2
                    },

                    new LightSwitchViewModel
                    {
                        Id = 333,
                        State = LightSwitchState.SwitchingOn,
                        RoomIndex = 3
                    }
                }
            };

            Clients.Caller.SET_CURRENT_LIGHTS_STATE(new JsonCamelCaseResult(currentState));
        }
    }
}