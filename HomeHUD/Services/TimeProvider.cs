using System;

namespace HomeHUD.Services
{
    public interface ITimeProvider
    {
        DateTime Now { get; }
        DateTime Today { get; }

        void UseTimeZone(string timeZoneId);
        void UseUtc();
        DateTime NowInTimeZone(string timeZoneId);
        DateTime TodayInTimeZone(string timeZoneId);
    }

    public class TimeProvider : ITimeProvider
    {
        public DateTime Now =>
            timeZone == null
            ? DateTime.UtcNow
            : TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone);

        public DateTime Today =>
            timeZone == null
            ? DateTime.UtcNow.Date
            : TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone).Date;

        private TimeZoneInfo timeZone;
        public void UseTimeZone(string timeZoneId)
        {
            timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
        }

        public void UseUtc()
        {
            timeZone = null;
        }

        public DateTime NowInTimeZone(string timeZoneId)
        {
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            return TimeZoneInfo.ConvertTime(Now, timeZone);
        }

        public DateTime TodayInTimeZone(string timeZoneId)
        {
            return NowInTimeZone(timeZoneId).Date;
        }
    }
}
