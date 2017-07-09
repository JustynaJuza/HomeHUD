using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace HomeHUD.Models.Identity
{
    public enum InternalRole
    {
        Developer,
        Admin
    }

    public class User : IdentityUser<int, UserClaim, UserRole, UserLogin>
    {
        public DateTime DateCreated { get; set; }

        [DisplayFormat(NullDisplayText = "Never logged in")]
        public DateTime? LastLoginDate { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        //public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User, int> manager)
        //{
        //    // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
        //    var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
        //    return userIdentity;
        //}

        //public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager)
        //{
        //    var authenticationType = "Basic";
        //    var userIdentity = new ClaimsIdentity(await manager.GetClaimsAsync(this), authenticationType);

        //    // Add custom user claims here
        //    userIdentity.AddClaim(new Claim("FirstName", this.FirstName));

        //    return userIdentity;
        //}
    }
}