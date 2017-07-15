using HomeHUD.Models.Extensions;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using static HomeHUD.TokenAuthenticationProvider;

namespace HomeHUD.Services
{
    public class TokenCookie
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
    }

    public interface ITokenProvider
    {
        Task<TokenCookie> GenerateToken(string userName, DateTime loginTime);
    }

    public class TokenProvider : ITokenProvider
    {
        private readonly TokenProviderOptions _options;
        //private readonly JsonSerializerSettings _serializerSettings;

        public TokenProvider(IOptions<TokenProviderOptions> options)
        {
            _options = options.Value;
        }

        public async Task<TokenCookie> GenerateToken(string userName, DateTime loginTime)
        {
            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, loginTime.ToUnixEpochDate().ToString(), ClaimValueTypes.Integer64)
            };

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: loginTime,
                expires: loginTime.Add(_options.Duration),
                signingCredentials: _options.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new TokenCookie
            {
                access_token = encodedJwt,
                expires_in = (int) _options.Duration.TotalSeconds
            };

            //// Serialize and return the response
            //context.Response.ContentType = "application/json";
            //await context.Response.WriteAsync(JsonConvert.SerializeObject(response, _serializerSettings));
        }
    }
}