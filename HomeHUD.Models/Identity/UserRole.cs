using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace HomeHUD.Models.Identity
{
    public class UserRole : IdentityUserRole<int> {

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}