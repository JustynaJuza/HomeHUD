using FluentScheduler;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        private readonly ITimeProvider _timeProvider;
        private readonly Options _options;

        private readonly object _lock = new object();
        private bool _shuttingDown;

        public LightSwitchScheduler(
            ITimeProvider timeProvider,
            Options options)
        {
            _timeProvider = timeProvider;
            _options = options;

            _timeProvider.UseTimeZone(_options.TimeZone);
        }

        public void Execute()
        {
            lock (_lock)
            {
                if (_shuttingDown)
                    return;

                var switchOffTime = _timeProvider.Today.Add(_options.SwitchOffTime);
                var sunsetSwitchSchedulingTime = _timeProvider.Today.Add(_options.SunsetSwitchSchedulingTime);

                JobManager.AddJob<LightSwitcherJob>(x => x.ToRunOnceAt(switchOffTime.ToUniversalTime()).AndEvery(1).Days());
                JobManager.AddJob<LightSwitcherJob>(x => x.ToRunOnceAt(sunsetSwitchSchedulingTime.ToUniversalTime()).AndEvery(1).Days());
            }
        }

        public void Stop()
        {
            lock (_lock)
            {
                _shuttingDown = true;
            }
        }
    }
}
