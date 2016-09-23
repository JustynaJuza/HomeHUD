using Microsoft.AspNet.Identity.EntityFramework;

namespace StandaloneAssessmentModule.Models.Users
{
    public class UserRole : IdentityUserRole<int> {

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}