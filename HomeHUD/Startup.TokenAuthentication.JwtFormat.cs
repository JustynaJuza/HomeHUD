using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace HomeHUD
{
    public partial class TokenAuthenticationProvider
    {
        public class TokenProviderOptions
        {
            public string Issuer { get; set; }
            public string Audience { get; set; }
            public TimeSpan Duration { get; set; }
            public SigningCredentials SigningCredentials { get; set; }

            public void CheckIfValid()
            {
                if (string.IsNullOrEmpty(Issuer))
                    throw new ArgumentNullException(nameof(Issuer));

                if (string.IsNullOrEmpty(Audience))
                    throw new ArgumentNullException(nameof(Audience));

                if (Duration == TimeSpan.Zero)
                    throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(Duration));

                if (SigningCredentials == null)
                    throw new ArgumentNullException(nameof(SigningCredentials));
            }
        }

        public class CustomJwtDataFormat : ISecureDataFormat<AuthenticationTicket>
        {
            private readonly string _algorithm;
            private readonly TokenValidationParameters _validationParameters;
            private readonly TokenProviderOptions _options;

            public CustomJwtDataFormat(
                string algorithm,
                TokenValidationParameters validationParameters,
                TokenProviderOptions options)
            {
                _algorithm = algorithm;
                _validationParameters = validationParameters;
                _options = options;
            }

            public AuthenticationTicket Unprotect(string protectedText)
                => Unprotect(protectedText, null);

            public AuthenticationTicket Unprotect(string protectedText, string purpose)
            {
                var handler = new JwtSecurityTokenHandler();
                ClaimsPrincipal principal = null;
                SecurityToken validToken = null;

                try
                {
                    principal = handler.ValidateToken(protectedText, _validationParameters, out validToken);

                    var validJwt = validToken as JwtSecurityToken;

                    if (validJwt == null)
                    {
                        throw new ArgumentException("Invalid JWT");
                    }

                    if (!validJwt.Header.Alg.Equals(_algorithm, StringComparison.Ordinal))
                    {
                        throw new ArgumentException($"Algorithm must be '{_algorithm}'");
                    }

                    // Additional custom validation of JWT claims here (if any)
                }
                catch (SecurityTokenValidationException)
                {
                    return null;
                }
                catch (ArgumentException)
                {
                    return null;
                }

                // Validation passed. Return a valid AuthenticationTicket:
                return new AuthenticationTicket(principal, new AuthenticationProperties(), "Cookie");
            }

            // This part is for creating a custom JWT cookie on SignInManager.PasswordSignInAsync
            public string Protect(AuthenticationTicket data)
                => Protect(data, null);

            public string Protect(AuthenticationTicket data, string purpose)
            {
                var claims = new Claim[] {
                    new Claim(JwtRegisteredClaimNames.Sub, data.Principal.Identity.Name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, data.Properties.IssuedUtc.Value.UtcDateTime.ToString())
                };

                var jwt = new JwtSecurityToken(
                    issuer: _options.Issuer,
                    audience: _options.Audience,
                    claims: data.Principal.Claims.Concat(claims),
                    notBefore: data.Properties.IssuedUtc.Value.UtcDateTime,
                    expires: data.Properties.IssuedUtc.Value.UtcDateTime.Add(_options.Duration), // data.Properties.ExpiresUtc.Value.UtcDateTime,
                    signingCredentials: _options.SigningCredentials);

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }
        }
    }
}
