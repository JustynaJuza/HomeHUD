using HomeHUD.Models;
using HomeHUD.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeHUD.Controllers
{
    public class LightsController : Controller
    {
        private readonly ILightSwitchService _lightSwitchService;

        public LightsController(
            ILightSwitchService lightSwitchService)
        {
            _lightSwitchService = lightSwitchService;
        }

        [HttpPost]
        [Route("/lights/confirm")]
        public async Task ConfirmLightsState([FromBody] IList<LightViewModel> lights)
        {
            await _lightSwitchService.SetLights(lights);
        }
    }
}
