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

                _timeProvider.UseTimeZone(_options.TimeZone);
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
                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.Off }),
                        s => s.ToRunNow());
                }
                else
                {
                    var switchOnTime = GetSunsetTime().Subtract(_options.TimeToSwitchBeforeSunset);
                    JobManager.AddJob(
                        () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = LightSwitchState.On }),
                        s => s.ToRunOnceAt(switchOnTime.ToUniversalTime()));
                }
            }

            private bool IsSwitchOffTime()
            {
                return _timeProvider.Now >= _timeProvider.Today.Add(_options.SwitchOffTime);
            }

            private DateTime GetSunsetTime()
            {
                return _sunTimeService.GetSunsetTime(_options.Latitude, _options.Longitude, _timeProvider.Now);
            }
        }
    }
}
