using FluentScheduler;
using HomeHUD.Models;
using Microsoft.Extensions.Logging;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        public class SunsetSwitchJob : IJob
        {
            private readonly ILogger _logger;
            private readonly ILightSwitchTimeService _lightSwitchTimeService;
            private readonly ILightSwitchService _lightSwitchService;

            private readonly object _lock = new object();
            private bool _shuttingDown;

            public SunsetSwitchJob(
                ILoggerFactory loggerFactory,
                ILightSwitchTimeService lightSwitchTimeService,
                ILightSwitchService lightSwitchService)
            {
                _logger = loggerFactory.CreateLogger<SunsetSwitchJob>();

                _lightSwitchTimeService = lightSwitchTimeService;
                _lightSwitchService = lightSwitchService;
            }

            public void Execute()
            {
                lock (_lock)
                {
                    if (!_shuttingDown)
                        ScheduleSunsetLightsSwitch();
                }
            }

            public void Stop()
            {
                lock (_lock)
                {
                    _shuttingDown = true;
                }
            }

            private void ScheduleSunsetLightsSwitch()
            {
                var sunsetSwitch = _lightSwitchTimeService.GetSunsetSwitchTime();
                var sunsetSwitchUtc = sunsetSwitch.ToUtc();

                _logger.LogInformation($"Scheduling sunset lights switch at {sunsetSwitch.Time} ({sunsetSwitchUtc} UTC)");

                JobManager.AddJob(
                    () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.On }),
                    s => s.ToRunOnceAt(sunsetSwitchUtc));
            }
        }
    }
}
