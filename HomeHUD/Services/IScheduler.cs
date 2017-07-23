using HomeHUD.Models;
using System;

namespace HomeHUD.Services
{
    public class SchedulerOptions
    {
        public string TimeZone { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public interface ILightSwitchScheduler
    {
    }

    public class LightSwitchScheduler
    {
        private readonly ILightSwitchService _lightSwitchService;
        private readonly ISunTimeService _sunTimeService;
        private readonly SchedulerOptions _options;

        public LightSwitchScheduler(
            ILightSwitchService lightSwitchService,
            ISunTimeService sunTimeService,
            SchedulerOptions options)
        {
            _lightSwitchService = lightSwitchService;
            _sunTimeService = sunTimeService;
            _options = options;
        }

        public void ScheduleDailyLightsSwitch(DateTime time, LightSwitchState state)
        {
            TimeZoneInfo.GetSystemTimeZones();

            var utcTime = new DateTime(2013, 03, 25, 10, 20, 00);
            var usersTimeZone = TimeZoneInfo.FindSystemTimeZoneById(_options.TimeZone);
            var localTime = TimeZoneInfo.ConvertTime(utcTime, usersTimeZone);
            var sunsetTime = _sunTimeService.GetSunsetTime(_options.Latitude, _options.Longitude, localTime);

            //BackgroundJob.Schedule(() => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = state }), sunsetTime);
        }
    }
}
