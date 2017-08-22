using FluentScheduler;
using HomeHUD.Models;
using HomeHUD.Models.Extensions;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        public class LightSwitcherJob : IJob
        {
            private readonly ILogger _logger;
            private readonly ILightSwitchService _lightSwitchService;
            private readonly ISunTimeService _sunTimeService;
            private readonly ITimeProvider _timeProvider;
            private readonly Options _options;

            private readonly object _lock = new object();
            private bool _shuttingDown;

            public LightSwitcherJob(
                ILoggerFactory loggerFactory,
                ILightSwitchService lightSwitchService,
                ISunTimeService sunTimeService,
                ITimeProvider timeProvider,
                Options options)
            {
                _logger = loggerFactory.CreateLogger<LightSwitcherJob>();

                _lightSwitchService = lightSwitchService;
                _sunTimeService = sunTimeService;
                _timeProvider = timeProvider;
                _options = options;

                _timeProvider.UseTimeZone(_options.TimeZone);
            }

            public void Execute()
            {
                _logger.LogInformation("Executing scheduled job.");
                JobManager.JobException += (info) => Debug.WriteLine("An error just happened with a scheduled job: " + info.Exception);

                lock (_lock)
                {
                    if (!_shuttingDown)
                        ScheduleLightsSwitch();
                }
            }

            public void Stop()
            {
                lock (_lock)
                {
                    _shuttingDown = true;
                }
            }

            private void ScheduleLightsSwitch()
            {
                if (IsSwitchOffTime())
                {
                    _logger.LogInformation("Switching lights off.");
                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.Off }),
                        s => s.ToRunNow());
                }
                else
                {
                    var switchOnTime = GetSunsetTime().Subtract(_options.TimeToSwitchBeforeSunset);
                    var switchOnTimeUtc = switchOnTime.ConvertToUtc(_timeProvider.TimeZone);

                    _logger.LogInformation($"Scheduling evening lights on switch at {switchOnTime} ({switchOnTimeUtc} UTC), " +
                        $"{_options.TimeToSwitchBeforeSunset} before sunset.");

                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.On }),
                        s => s.ToRunOnceAt(switchOnTimeUtc));
                }
            }

            private bool IsSwitchOffTime()
            {
                _logger.LogDebug("Checking if lights are supposed to be switched off: " +
                    $"{_timeProvider.Now} >= {_timeProvider.Today.Add(_options.SwitchOffTime)}: " +
                    $"{_timeProvider.Now >= _timeProvider.Today.Add(_options.SwitchOffTime)}.");

                return _timeProvider.Now >= _timeProvider.Today.Add(_options.SwitchOffTime);
            }

            private DateTime GetSunsetTime()
            {
                var sunsetTime = _sunTimeService.GetSunsetTime(
                    _options.Latitude, _options.Longitude, _timeProvider.Now, _timeProvider.TimeZone.IsDaylightSavingTime(_timeProvider.Now));
                _logger.LogDebug($"Calculated sunset time: {sunsetTime}");
                return sunsetTime;
            }
        }
    }
}
