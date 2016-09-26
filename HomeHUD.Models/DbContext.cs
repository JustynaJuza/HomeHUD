using HomeHUD.Models.Users;
using Microsoft.AspNet.Identity.EntityFramework;

namespace HomeHUD.Models
{

    public class ApplicationDbContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public ApplicationDbContext() : base("DefaultConnection") { }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}