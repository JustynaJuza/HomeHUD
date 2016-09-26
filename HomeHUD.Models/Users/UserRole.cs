using Microsoft.AspNet.Identity.EntityFramework;

namespace HomeHUD.Models.Users
{
    public class UserRole : IdentityUserRole<int> {

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}