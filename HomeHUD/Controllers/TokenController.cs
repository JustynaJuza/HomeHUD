using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HomeHUD.Controllers
{
    public class TokenController : Controller
    {
        private readonly IAntiforgery _antiforgery;
        private readonly AntiforgeryOptions _antiforgeryOptions;

        public TokenController(
            IAntiforgery antiforgery,
            IOptions<AntiforgeryOptions> antiforgeryOptions)
        {
            _antiforgery = antiforgery;
            _antiforgeryOptions = antiforgeryOptions.Value;
        }

        [Route("/token/antiforgery")]
        public IActionResult GetAntiForgeryToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            return Json(new { headerName = tokens.HeaderName, token = tokens.RequestToken });
        }
    }
}