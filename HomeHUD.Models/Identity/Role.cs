using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace HomeHUD.Models.Identity
{
    public enum RoleName
    {
        User,
        Admin,
        GodMode,
        TempUser
    }

    public class Role : IdentityRole<int> { }
}