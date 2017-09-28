using FluentScheduler;
using HomeHUD.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        private readonly ILogger _logger;
        private readonly ILightSwitchTimeService _lightSwitchTimeService;
        private readonly Options _options;

        private readonly object _lock = new object();
        private bool _shuttingDown;

        public LightSwitchScheduler(
            ILoggerFactory loggerFactory,
            ILightSwitchTimeService lightSwitchTimeService,
            Options options)
        {
            _logger = loggerFactory.CreateLogger<LightSwitchScheduler>();

            _lightSwitchTimeService = lightSwitchTimeService;
            _options = options;
        }

        public void Execute()
        {
            lock (_lock)
            {
                if (_options.IsDisabled || _shuttingDown)
                    return;

                ScheduleSunsetSwitchScheduling();
                ScheduleSwitchTimes<LightSwitchStateOn>(_lightSwitchTimeService.GetSwitchOnTimes());
                ScheduleSwitchTimes<LightSwitchStateOff>(_lightSwitchTimeService.GetSwitchOffTimes());
            }
        }

        public void Stop()
        {
            lock (_lock)
            {
                _shuttingDown = true;
            }
        }

        private void ScheduleSunsetSwitchScheduling()
        {
            var sunsetSwitchSchedulingTime = _lightSwitchTimeService.GetSunsetSwitchSchedulingTime();
            var sunsetSwitchSchedulingTimeUtc = sunsetSwitchSchedulingTime.ToUtc();

            _logger.LogInformation($"Scheduling light switcher job at {sunsetSwitchSchedulingTime.Time} ({sunsetSwitchSchedulingTimeUtc} UTC)");

            JobManager.AddJob<SunsetSwitchJob>(
                x => x.ToRunNow().AndEvery(1).Days().At(sunsetSwitchSchedulingTimeUtc.Hour, sunsetSwitchSchedulingTimeUtc.Minute));
        }

        private void ScheduleSwitchTimes<T>(IEnumerable<LocalTime> switchTimes)
            where T : ILightSwitchState
        {
            foreach (var switchTime in switchTimes)
            {
                var switchTimeUtc = switchTime.ToUtc();
                JobManager.AddJob<SwitchJob<T>>(
                    x => x.ToRunEvery(0).Days().At(switchTimeUtc.Hour, switchTimeUtc.Minute));
            }
        }
    }
}
