using System;

namespace HomeHUD.Services
{
    public interface ITimeProvider
    {
        DateTime Now { get; }
        DateTime Today { get; }
    }

    public class TimeProvider : ITimeProvider
    {
        public DateTime Now => DateTime.UtcNow;
        public DateTime Today => DateTime.UtcNow.Date;
    }
}
