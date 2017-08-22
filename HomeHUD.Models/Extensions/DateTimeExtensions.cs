using System;

namespace HomeHUD.Models.Extensions
{
    public static class DateTimeExtensions
    {
        /// <summary>
        /// Get this datetime as a Unix epoch timestamp (seconds since Jan 1, 1970, midnight UTC).
        /// </summary>
        /// <param name="date">The date to convert.</param>
        /// <returns>Seconds since Unix epoch.</returns>
        public static long ToUnixEpochDate(this DateTime time)
            => (long) Math.Round((time.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);


        public static DateTime ConvertToUtc(this DateTime time, TimeZoneInfo sourceTimeZone)
        {
            return TimeZoneInfo.ConvertTime(time, sourceTimeZone, TimeZoneInfo.FindSystemTimeZoneById("UTC"));
        }
    }
}