using HomeHUD.Hubs;
using HomeHUD.Models;
using HomeHUD.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeHUD.Controllers
{
    public class LightsController : Controller
    {
        private readonly ILightSwitchService _lightSwitchService;
        private readonly IConnectionManager _connectionManager;

        private IHubContext<ControlHub, IControlHub> _controlHub;

        public LightsController(
            ILightSwitchService lightSwitchService,
            IConnectionManager connectionManager)
        {
            _lightSwitchService = lightSwitchService;
            _connectionManager = connectionManager;
        }

        [Route("/lights/confirm")]
        public Task ConfirmLightsState(IList<Light> lights)
        {
            _controlHub = _connectionManager.GetHubContext<ControlHub, IControlHub>();
            _controlHub.Clients.All.SetLightsState(lights);
            _lightSwitchService.SetLightsState(lights);

            return Task.CompletedTask;
        }

    }
}
