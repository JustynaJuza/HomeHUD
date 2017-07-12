using HomeHUD.Models.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace HomeHUD.Models.Identity
{
    public class ApplicationRoleStore : RoleStore<Role, ApplicationDbContext, int, UserRole, RoleClaim>
    {
        public ApplicationRoleStore(ApplicationDbContext context, IdentityErrorDescriber describer = null) : base(context, describer) { }

        protected override RoleClaim CreateRoleClaim(Role role, Claim claim)
        {
            throw new NotImplementedException();
        }
    }
}