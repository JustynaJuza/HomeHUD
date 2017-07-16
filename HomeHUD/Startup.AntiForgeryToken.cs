using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HomeHUD
{
    public static class ValidateAntiForgeryTokenMiddlewareStartup
    {
        public static IApplicationBuilder UseValidateAntiForgeryToken(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidateAntiForgeryTokenMiddleware>();
        }
    }

    public class ValidateAntiForgeryTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IAntiforgery _antiforgery;

        public ValidateAntiForgeryTokenMiddleware(RequestDelegate next, IAntiforgery antiforgery)
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

    public class AntiforgeryOptions
    {
        public string CookieName { get; set; }
        public string HeaderName { get; set; }
    }
}
