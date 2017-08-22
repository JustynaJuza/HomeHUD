using FluentScheduler;
using HomeHUD.Models.Extensions;
using Microsoft.Extensions.Logging;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        private readonly ILogger _logger;
        private readonly ITimeProvider _timeProvider;
        private readonly Options _options;

        private readonly object _lock = new object();
        private bool _shuttingDown;

        public LightSwitchScheduler(
            ILoggerFactory loggerFactory,
            ITimeProvider timeProvider,
            Options options)
        {
            _logger = loggerFactory.CreateLogger<LightSwitchScheduler>();

            _timeProvider = timeProvider;
            _options = options;

            _timeProvider.UseTimeZone(_options.TimeZone);
        }

        public void Execute()
        {
            lock (_lock)
            {
                if (_options.IsDisabled || _shuttingDown)
                    return;

                var switchOffTime = _timeProvider.Today.Add(_options.SwitchOffTime);
                var sunsetSwitchSchedulingTime = _timeProvider.Today.Add(_options.SunsetSwitchSchedulingTime);
                var switchOffTimeUtc = switchOffTime.ConvertToUtc(_timeProvider.TimeZone);
                var sunsetSwitchSchedulingTimeUtc = sunsetSwitchSchedulingTime.ConvertToUtc(_timeProvider.TimeZone);

                _logger.LogInformation("Scheduling light switcher job at " +
                    $"{sunsetSwitchSchedulingTime} ({sunsetSwitchSchedulingTimeUtc} UTC) and {switchOffTime} ({switchOffTimeUtc} UTC) " +
                    $"for timezone {_timeProvider.TimeZone.DisplayName}");

                JobManager.AddJob<LightSwitcherJob>(
                    x => x.ToRunNow().AndEvery(1).Days().At(sunsetSwitchSchedulingTimeUtc.Hour, sunsetSwitchSchedulingTimeUtc.Minute));
                JobManager.AddJob<LightSwitcherJob>(
                    x => x.ToRunEvery(0).Days().At(switchOffTimeUtc.Hour, switchOffTimeUtc.Minute));
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
