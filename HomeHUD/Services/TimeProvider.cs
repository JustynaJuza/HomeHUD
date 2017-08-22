using Microsoft.Extensions.Logging;
using System;

namespace HomeHUD.Services
{
    public interface ITimeProvider
    {
        DateTime Now { get; }
        DateTime Today { get; }
        TimeZoneInfo TimeZone { get; }

        void UseTimeZone(string timeZoneId);
        void UseUtc();
        DateTime NowInTimeZone(string timeZoneId);
        DateTime TodayInTimeZone(string timeZoneId);
    }

    public class TimeProvider : ITimeProvider
    {
        private readonly ILogger _logger;

        public TimeProvider(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<TimeProvider>();
        }

        public DateTime Now =>
            timeZone == null
                ? DateTime.UtcNow
                : TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone);

        public DateTime Today =>
            timeZone == null
                ? DateTime.UtcNow.Date
                : TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone).Date;

        private TimeZoneInfo timeZone;
        public TimeZoneInfo TimeZone => timeZone;

        public void UseTimeZone(string timeZoneId)
        {
            timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            _logger.LogDebug($"Timezone set to {timeZone.DisplayName}, " +
                $"with current time {Now} and daylight saving: {timeZone.IsDaylightSavingTime(Now)}");
        }

        public void UseUtc()
        {
            timeZone = null;
            _logger.LogDebug($"Using UTC time with current time {TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone)}");
        }

        public DateTime NowInTimeZone(string timeZoneId)
        {
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            return TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone);
        }

        public DateTime TodayInTimeZone(string timeZoneId)
        {
            return NowInTimeZone(timeZoneId).Date;
        }
    }
}
