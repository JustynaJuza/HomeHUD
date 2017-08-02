using FluentScheduler;
using HomeHUD.Models;
using System;
using System.Diagnostics;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        public class LightSwitcherJob : IJob
        {
            private readonly ILightSwitchService _lightSwitchService;
            private readonly ISunTimeService _sunTimeService;
            private readonly ITimeProvider _timeProvider;
            private readonly Options _options;

            private readonly object _lock = new object();
            private bool _shuttingDown;

            public LightSwitcherJob(
                ILightSwitchService lightSwitchService,
                ISunTimeService sunTimeService,
                ITimeProvider timeProvider,
                Options options)
            {
                _lightSwitchService = lightSwitchService;
                _sunTimeService = sunTimeService;
                _timeProvider = timeProvider;
                _options = options;
            }

            public void Execute()
            {
                JobManager.JobException += (info) => Debug.WriteLine("An error just happened with a scheduled job: " + info.Exception);

                lock (_lock)
                {
                    if (!_shuttingDown)
                        ScheduleLightsSwitch();
                }
            }

            public void Stop(bool immediate)
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
                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.Off }),
                        s => s.ToRunNow());
                }
                else
                {
                    var sunset = GetSunsetTime();
                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.On }),
                        s => s.ToRunOnceAt(sunset));
                }
            }

            private bool IsSwitchOffTime()
            {
                return DateTime.UtcNow >= DateTime.UtcNow.Date.Add(_options.SwitchOffTime);
            }

            private DateTime GetSunsetTime()
            {
                var timeZone = TimeZoneInfo.FindSystemTimeZoneById(_options.TimeZone);
                var localTime = TimeZoneInfo.ConvertTime(_timeProvider.Now, timeZone);
                return _sunTimeService.GetSunsetTime(_options.Latitude, _options.Longitude, localTime);
            }
        }
    }
}
