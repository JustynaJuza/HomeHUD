using HomeHUD.Models.Extensions;
using System;

namespace HomeHUD.Models
{
    public class LocalTime
    {
        public TimeZoneInfo TimeZone { get; set; }
        public DateTime Time { get; set; }

        public DateTime ToUtc() => Time.ConvertToUtc(TimeZone);
    }

    public class LocalLightSwitchTimes
    {
        public LocalTime Sunset { get; set; }
        public LocalTime NextSwitchOn { get; set; }
        public LocalTime NextSwitchOff { get; set; }
    }
}