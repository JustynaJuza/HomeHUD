using System;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler
    {
        public class Options
        {
            public bool IsDisabled { get; set; }
            public string TimeZone { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
            public TimeSpan TimeToSwitchBeforeSunset { get; set; } = new TimeSpan(0, 0, 0);
            public TimeSpan SunsetSwitchSchedulingTime { get; set; } = new TimeSpan(0, 0, 0);
            public TimeSpan[] SwitchOnTimes { get; set; } = new[] { new TimeSpan(19, 0, 0) };
            public TimeSpan[] SwitchOffTimes { get; set; } = new[] { new TimeSpan(23, 0, 0) };
        }
    }
}
