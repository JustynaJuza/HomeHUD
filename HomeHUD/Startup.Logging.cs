using log4net;
using log4net.Appender;
using log4net.Config;
using log4net.Layout;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Reflection;

namespace HomeHUD
{
    public static class LoggingStartupExtensions
    {
        public static void AddLogging(this IApplicationBuilder app, ILoggerFactory loggerFactory, IConfigurationRoot configuration)
        {
            var loggingConfig = configuration.GetSection("Logging");

            loggerFactory.AddConsole(loggingConfig);
            loggerFactory.AddDebug();
            loggerFactory.AddProvider(new Log4NetProvider(loggingConfig.GetValue<string>("FormatPattern")));

            loggerFactory.CreateLogger(Assembly.GetEntryAssembly().GetName().Name).LogInformation("Application starting.");
        }
    }

    public class Log4NetProvider : ILoggerProvider
    {
        private readonly ConcurrentDictionary<string, Log4NetLogger> _loggers =
            new ConcurrentDictionary<string, Log4NetLogger>();
        private readonly string _formatPattern;

        public Log4NetProvider(string formatPattern)
        {
            _formatPattern = formatPattern;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return _loggers.GetOrAdd(categoryName, GetLogger);
        }

        private Log4NetLogger GetLogger(string name)
        {
            var appender = new RollingFileAppender
            {
                File = $"{Assembly.GetEntryAssembly().GetName().Name}.log",
                Layout = new PatternLayout(_formatPattern)
            };
            appender.ActivateOptions();

            return new Log4NetLogger(name, appender);
        }

        public void Dispose()
        {
            _loggers.Clear();
        }
    }

    public class Log4NetLogger : ILogger
    {
        private readonly ILog _log;

        public Log4NetLogger(string name, IAppender appender)
        {
            var loggerRepository = LogManager.CreateRepository(
                Assembly.GetEntryAssembly(), typeof(log4net.Repository.Hierarchy.Hierarchy));

            BasicConfigurator.Configure(loggerRepository, appender);
            _log = LogManager.GetLogger(loggerRepository.Name, name);
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            switch (logLevel)
            {
                case LogLevel.Critical:
                    return _log.IsFatalEnabled;
                case LogLevel.Debug:
                case LogLevel.Trace:
                    return _log.IsDebugEnabled;
                case LogLevel.Error:
                    return _log.IsErrorEnabled;
                case LogLevel.Information:
                    return _log.IsInfoEnabled;
                case LogLevel.Warning:
                    return _log.IsWarnEnabled;
                default:
                    throw new ArgumentOutOfRangeException(nameof(logLevel));
            }
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state,
            Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            if (formatter == null)
                throw new ArgumentNullException(nameof(formatter));

            if (state != null || exception != null)
            {
                var message = formatter(state, exception);

                switch (logLevel)
                {
                    case LogLevel.Critical:
                        _log.Fatal(message);
                        break;
                    case LogLevel.Debug:
                    case LogLevel.Trace:
                        _log.Debug(message);
                        break;
                    case LogLevel.Error:
                        _log.Error(message);
                        break;
                    case LogLevel.Information:
                        _log.Info(message);
                        break;
                    case LogLevel.Warning:
                        _log.Warn(message);
                        break;
                    default:
                        _log.Warn($"Encountered unknown log level {logLevel}, writing out as Info.");
                        _log.Info(message, exception);
                        break;
                }
            }
        }
    }
}
