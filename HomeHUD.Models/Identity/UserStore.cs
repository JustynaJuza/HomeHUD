using System;
using System.Security.Claims;
using HomeHUD.Models.DbContext;
using HomeHUD.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class ApplicationUserStore : UserStore<User, Role, ApplicationDbContext, int, UserClaim, UserRole, UserLogin, UserToken, RoleClaim>
{
    public ApplicationUserStore(ApplicationDbContext context, IdentityErrorDescriber describer = null) : base(context, describer) { }

    protected override UserClaim CreateUserClaim(User user, Claim claim)
    {
        throw new NotImplementedException();
    }

    protected override UserLogin CreateUserLogin(User user, UserLoginInfo login)
    {
        throw new NotImplementedException();
    }

    protected override UserRole CreateUserRole(User user, Role role)
    {
        throw new NotImplementedException();
    }

    protected override UserToken CreateUserToken(User user, string loginProvider, string name, string value)
    {
        throw new NotImplementedException();
    }
}