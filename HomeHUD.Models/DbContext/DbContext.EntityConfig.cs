
using HomeHUD.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext
    {
        public static class EntityConfig
        {
            internal static void ConfigureTables(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<User>().ToTable("Users");
                modelBuilder.Entity<UserLogin>().ToTable("UserLogins");
                modelBuilder.Entity<UserClaim>().ToTable("UserClaims");
                modelBuilder.Entity<UserToken>().ToTable("UserTokens");
                modelBuilder.Entity<UserRole>().ToTable("UserRoles");
                modelBuilder.Entity<Role>().ToTable("Roles");
                modelBuilder.Entity<RoleClaim>().ToTable("RoleClaims");
            }
        }
    }
}