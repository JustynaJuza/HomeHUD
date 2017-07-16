using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace HomeHUD
{
    public class AntiforgeryOptions
    {
        public string CookieName { get; set; }
        public string HeaderName { get; set; }
    }

    public static class AntiforgeryTokenStartup
    {
        public static void AddAntiforgeryToken(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddAntiforgery(options =>
            {
                var antiforgeryOptions = new AntiforgeryOptions();
                configuration.GetSection("AntiForgery").Bind(antiforgeryOptions);

                options.CookieName = antiforgeryOptions.CookieName;
                options.HeaderName = antiforgeryOptions.HeaderName;
                options.FormFieldName = antiforgeryOptions.HeaderName;
            });
        }
    }

    public static class ValidateAntiforgeryTokenMiddlewareStartup
    {
        public static IApplicationBuilder UseValidateAntiforgeryToken(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidateAntiforgeryTokenMiddleware>();
        }
    }

    public class ValidateAntiforgeryTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IAntiforgery _antiforgery;

        public ValidateAntiforgeryTokenMiddleware(RequestDelegate next, IAntiforgery antiforgery)
        {
            _next = next;
            _antiforgery = antiforgery;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var validatedRequest = await _antiforgery.IsRequestValidAsync(httpContext);
            if (validatedRequest)
            {
                await _next(httpContext);
            }
            else
            {
                httpContext.Response.StatusCode = 400;
            }
        }
    }
}
