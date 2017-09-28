using FluentScheduler;
using HomeHUD.Models;
using Microsoft.Extensions.Logging;
using System;

namespace HomeHUD.Services.Jobs
{
    public partial class LightSwitchScheduler : IJob
    {
        public class SwitchJob<T> : IJob
            where T : ILightSwitchState
        {
            private readonly ILogger _logger;
            private readonly ILightSwitchService _lightSwitchService;
            private readonly LightSwitchState _lightSwitchState;

            private readonly object _lock = new object();
            private bool _shuttingDown;

            public SwitchJob(
                ILoggerFactory loggerFactory,
                ILightSwitchService lightSwitchService)
            {
                if (typeof(T) != typeof(LightSwitchStateOn) && typeof(T) != typeof(LightSwitchStateOff))
                {
                    throw new ArgumentException($"The generic type has to be either {nameof(LightSwitchStateOn)} or {nameof(LightSwitchStateOff)}");
                }

                _logger = loggerFactory.CreateLogger<SwitchJob<T>>();

                _lightSwitchService = lightSwitchService;
                _lightSwitchState = (typeof(T) == typeof(LightSwitchStateOn)) ? LightSwitchState.On : LightSwitchState.Off;
            }

            public void Execute()
            {
                lock (_lock)
                {
                    if (!_shuttingDown)
                    {
                        _logger.LogInformation($"Switching lights {_lightSwitchState}");
                        JobManager.AddJob(
                            () => _lightSwitchService.SetLightsState(new LightsStateViewModel { State = _lightSwitchState }),
                            s => s.ToRunNow());
                    }
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
}
