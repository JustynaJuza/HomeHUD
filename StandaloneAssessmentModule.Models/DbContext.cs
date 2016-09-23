using Microsoft.AspNet.Identity.EntityFramework;
using StandaloneAssessmentModule.Models.Users;

namespace StandaloneAssessmentModule.Models
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