using HomeHUD.Models;
using HomeHUD.Services.Jobs;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace HomeHUD.Services
{
    public interface ILightSwitchTimeService
    {
        LocalTime GetSunsetSwitchTime();
        LocalTime GetSunsetSwitchSchedulingTime();
        IEnumerable<LocalTime> GetSwitchOnTimes();
        IEnumerable<LocalTime> GetSwitchOffTimes();

        LocalLightSwitchTimes GetLightSwitchTimes();
    }

    public class LightSwitchTimeService : ILightSwitchTimeService
    {
        private readonly ILogger _logger;
        private readonly ISunTimeService _sunTimeService;
        private readonly ITimeProvider _timeProvider;
        private readonly LightSwitchScheduler.Options _options;

        public LightSwitchTimeService(
            ILoggerFactory loggerFactory,
            ISunTimeService sunTimeService,
            ITimeProvider timeProvider,
            LightSwitchScheduler.Options options)
        {
            _logger = loggerFactory.CreateLogger<LightSwitchTimeService>();

            _sunTimeService = sunTimeService;
            _timeProvider = timeProvider;
            _options = options;

            _timeProvider.UseTimeZone(_options.TimeZone);
        }

        public LocalLightSwitchTimes GetLightSwitchTimes()
        {
            return new LocalLightSwitchTimes
            {
                Sunset = GetSunsetTime(),
                NextSwitchOn = GetNextSwitchOn(),
                NextSwitchOff = GetNextSwitchOff()
            };
        }

        private LocalTime GetSunsetTime()
        {
            var sunsetTime = _sunTimeService.GetSunsetTime(
                    _options.Latitude,
                    _options.Longitude,
                    _timeProvider.Now,
                    _timeProvider.TimeZone.IsDaylightSavingTime(_timeProvider.Now));

            _logger.LogDebug($"Calculated sunset time: {sunsetTime}");

            return new LocalTime
            {
                Time = sunsetTime,
                TimeZone = _timeProvider.TimeZone
            };
        }

        private LocalTime GetNextSwitchOff()
        {
            return GetSwitchOffTimes()
                .OrderBy(x => x.Time)
                .First(x => x.Time >= _timeProvider.Now);
        }

        private LocalTime GetNextSwitchOn()
        {
            return GetSwitchOnTimes()
                .Concat(new[] { GetSunsetSwitchTime() })
                .OrderBy(x => x.Time)
                .First(x => x.Time >= _timeProvider.Now);
        }

        public LocalTime GetSunsetSwitchTime()
        {
            var sunset = GetSunsetTime();
            return new LocalTime
            {
                Time = sunset.Time.Subtract(_options.TimeToSwitchBeforeSunset),
                TimeZone = _timeProvider.TimeZone
            };
        }

        public LocalTime GetSunsetSwitchSchedulingTime()
        {
            return new LocalTime
            {
                Time = _timeProvider.Today.Add(_options.SunsetSwitchSchedulingTime),
                TimeZone = _timeProvider.TimeZone
            };
        }

        public IEnumerable<LocalTime> GetSwitchOnTimes()
        {
            return _options.SwitchOnTimes
                .Distinct()
                .OrderBy(x => x)
                .Select(x => new LocalTime
                {
                    Time = _timeProvider.Today.Add(x),
                    TimeZone = _timeProvider.TimeZone
                });
        }

        public IEnumerable<LocalTime> GetSwitchOffTimes()
        {
            return _options.SwitchOffTimes
                .Distinct()
                .OrderBy(x => x)
                .Select(x => new LocalTime
                {
                    Time = _timeProvider.Today.Add(x),
                    TimeZone = _timeProvider.TimeZone
                });
        }
    }
}