using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace HomeHUD.Models.Users
{
    public enum InternalRole
    {
        Developer,
        Admin
    }

    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>
    {
        public DateTime DateCreated { get; set; }

        [DisplayFormat(NullDisplayText = "Never logged in")]
        public DateTime? LastLoginDate { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User, int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }
    }
}