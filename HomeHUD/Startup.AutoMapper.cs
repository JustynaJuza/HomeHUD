using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace HomeHUD
{
    public static class AutoMapperStartup
    {
        public static void AddAutoMapper(this IServiceCollection services)
        {
            var dependencyContext = DependencyContext.Default;
            AddAutoMapperClasses(
                dependencyContext.RuntimeLibraries
                .SelectMany(lib => lib.GetDefaultAssemblyNames(dependencyContext)
                .Select(Assembly.Load)));
        }

        private static void AddAutoMapperClasses(IEnumerable<Assembly> assembliesToScan)
        {
            var profiles = assembliesToScan
                .SelectMany(a => a.ExportedTypes)
                .Where(t => typeof(Profile).GetTypeInfo().IsAssignableFrom(t.GetTypeInfo()))
                .Where(t => !t.GetTypeInfo().IsAbstract);

            Mapper.Initialize(cfg =>
            {
                foreach (var profile in profiles)
                {
                    cfg.AddProfile(profile);
                }
            });
        }
    }
}
