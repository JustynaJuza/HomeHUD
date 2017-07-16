using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace HomeHUD
{
    public partial class TokenAuthenticationProvider
    {
        private readonly string _securityAlgorithm = SecurityAlgorithms.HmacSha256;
        private readonly IConfigurationRoot _configuration;
        private readonly SymmetricSecurityKey _securityKey;
        private readonly TokenProviderOptions _options;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public readonly JwtBearerOptions JwtBearerOptions;
        public readonly CookieAuthenticationOptions CookieAuthenticationOptions;

        public TokenAuthenticationProvider(IConfigurationRoot configuration)
        {
            _configuration = configuration;

            _securityKey = GetSecuriyKey();
            _options = GetTokenProviderOptions();
            _tokenValidationParameters = GetTokenValidationParameters();

            JwtBearerOptions = GetJwtBearerOptions();
            CookieAuthenticationOptions = GetCookieAuthenticationOptions();
        }

        private SymmetricSecurityKey GetSecuriyKey()
        {
            var key = _configuration.GetValue<string>(
                $"{nameof(TokenAuthenticationProvider)}:{nameof(SymmetricSecurityKey)}");

            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
        }

        private TokenProviderOptions GetTokenProviderOptions()
        {
            var options = new TokenProviderOptions
            {
                SigningCredentials = new SigningCredentials(_securityKey, _securityAlgorithm)
            };
            _configuration.GetSection($"{nameof(TokenAuthenticationProvider)}:{nameof(TokenProviderOptions)}").Bind(options);

            options.CheckIfValid();
            return options;
        }

        //public void SetTokenProviderOptions(TokenProviderOptions options)
        //{
        //    _configuration.GetSection($"{nameof(TokenAuthenticationProvider)}:{nameof(TokenProviderOptions)}").Bind(options);
        //    options.SigningCredentials = new SigningCredentials(_securityKey, _securityAlgorithm);
        //    options.CheckIfValid();
        //}

        private TokenValidationParameters GetTokenValidationParameters()
            => new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _securityKey,
                ValidateIssuer = true,
                ValidIssuer = _options.Issuer,
                ValidateAudience = true,
                ValidAudience = _options.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

        private JwtBearerOptions GetJwtBearerOptions()
            => new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = _tokenValidationParameters
            };

        private CookieAuthenticationOptions GetCookieAuthenticationOptions()
            => new CookieAuthenticationOptions
            {
                CookieHttpOnly = true,
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                AuthenticationScheme = "Cookie",
                ExpireTimeSpan = _options.Duration,
                SlidingExpiration = true,
                CookieName = "access_token",
                TicketDataFormat = new CustomJwtDataFormat(
                    _securityAlgorithm,
                    _tokenValidationParameters,
                    _options),
                Events = new CookieAuthenticationEvents
                {
                    OnValidatePrincipal = SecurityStampValidator.ValidatePrincipalAsync,
                    OnRedirectToLogin = async (context) => context.Response.StatusCode = 401,
                    OnRedirectToAccessDenied = async (context) => context.Response.StatusCode = 403
                }
            };
    }
}
