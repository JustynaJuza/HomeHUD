﻿using FluentScheduler;
using HomeHUD.Services.Jobs;
using Microsoft.AspNetCore.Builder;
using SimpleInjector;

namespace HomeHUD
{
    public static class FluentSchedulerStartup
    {
        public static void UseFluentScheduler(this IApplicationBuilder app, Container container)
        {
            JobManager.JobFactory = new JobFactory(container);
            //Log.Fatal("An error just happened with a scheduled job: " + info.Exception);
            JobManager.Initialize(new ScheduledJobsRegistry());
        }
    }

    public class JobFactory : IJobFactory
    {
        private readonly Container _container;

        public JobFactory(Container container)
        {
            _container = container;
        }

        public IJob GetJobInstance<T>() where T : IJob
        {
            return (T) _container.GetInstance(typeof(T));
        }
    }

    public class ScheduledJobsRegistry : Registry
    {
        public ScheduledJobsRegistry()
        {
            Schedule<LightSwitchScheduler>().ToRunNow();
        }
    }
}
