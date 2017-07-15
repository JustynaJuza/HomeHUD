using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HomeHUD.Models.Identity
{
    public class ApplicationClaimsPrincipal : ClaimsPrincipal
    {
        public ApplicationClaimsPrincipal(ClaimsPrincipal claimsPrincipal) : base(claimsPrincipal) { }

        public int UserId { get { return int.Parse(this.FindFirst(ClaimTypes.Sid).Value); } }
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
            new Claim("email", user.Email),
            new Claim("firstName", user.FirstName ?? string.Empty),
            new Claim("lastName", user.LastName ?? string.Empty)
        });

            return principal;
        }
    }
}