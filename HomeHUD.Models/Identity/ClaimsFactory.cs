using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HomeHUD.Models.Identity
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal claimsPrincipal)
            => int.Parse(claimsPrincipal.FindFirst("id").Value);

        public static string GetEmail(this ClaimsPrincipal claimsPrincipal)
            => claimsPrincipal.FindFirst("email").Value;

        public static ApplicationClaims GetProperties(this ClaimsPrincipal claimsPrincipal)
            => new ApplicationClaims(claimsPrincipal);
    }

    public class ApplicationClaims
    {
        private readonly ClaimsPrincipal _claimsPrincipal;

        public ApplicationClaims(ClaimsPrincipal claimsPrincipal)
        {
            _claimsPrincipal = claimsPrincipal;
        }

        public int UserId { get { return int.Parse(_claimsPrincipal.FindFirst("id").Value); } }
        public string Email { get { return _claimsPrincipal.FindFirst("email").Value; } }
    }

    public class ApplicationClaimsPrincipal : ClaimsPrincipal
    {
        public ApplicationClaimsPrincipal(ClaimsPrincipal claimsPrincipal) : base(claimsPrincipal) { }

        public int UserId { get { return int.Parse(FindFirst("id").Value); } }
        public string Email { get { return FindFirst("email").Value; } }
    }

    public class ApplicationClaimsPrincipalFactory : UserClaimsPrincipalFactory<User, Role>
    {
        public ApplicationClaimsPrincipalFactory(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IOptions<IdentityOptions> optionsAccessor) : base(userManager, roleManager, optionsAccessor)
        { }

        public async override Task<ClaimsPrincipal> CreateAsync(User user)
        {
            var principal = await base.CreateAsync(user);

            ((ClaimsIdentity) principal.Identity).AddClaims(new[] {
                new Claim("id", user.Id.ToString(), ClaimValueTypes.Integer),
                new Claim("email", user.Email),
                new Claim("firstName", user.FirstName ?? string.Empty),
                new Claim("lastName", user.LastName ?? string.Empty)
            });

            return principal;
        }
    }
}