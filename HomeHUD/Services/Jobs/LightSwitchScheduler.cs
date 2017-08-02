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
        }

        public void Execute()
        {
            lock (_lock)
            {
                if (_shuttingDown)
                    return;

                var switchOffTime = _timeProvider.Today.Add(_options.SwitchOffTime);
                var switchOnTime = _timeProvider.Today.Add(_options.SunsetSwitchSchedulingTime);

                JobManager.AddJob<LightSwitcherJob>(x => x.ToRunOnceAt(switchOffTime).AndEvery(1).Days());
                JobManager.AddJob<LightSwitcherJob>(x => x.ToRunOnceAt(switchOnTime).AndEvery(1).Days());
            }
        }

        public void Stop(bool immediate)
        {
            lock (_lock)
            {
                _shuttingDown = true;
            }
        }
    }
}
