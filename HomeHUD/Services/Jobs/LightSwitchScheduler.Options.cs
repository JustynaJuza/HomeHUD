using System;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler
    {
        public class Options
        {
            public string TimeZone { get; set; }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
            public TimeSpan TimeToSwitchBeforeSunset { get; set; } = new TimeSpan(0, 0, 0);
            public TimeSpan SunsetSwitchSchedulingTime { get; set; } = new TimeSpan(0, 0, 0);
            public TimeSpan SwitchOnTime { get; set; } = new TimeSpan(7, 0, 0);
            public TimeSpan SwitchOffTime { get; set; } = new TimeSpan(23, 0, 0);
        }
    }
}
