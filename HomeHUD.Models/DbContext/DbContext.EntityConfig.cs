using HomeHUD.Models.Users;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext
    {
        public static class EntityConfig
        {
            internal static void ConfigureModelBuilder(System.Data.Entity.DbModelBuilder modelBuilder)
            {
                modelBuilder.Entity<User>().ToTable("Users");
                modelBuilder.Entity<UserRole>().ToTable("UserRoles");
                modelBuilder.Entity<UserLogin>().ToTable("UserLogins");
                modelBuilder.Entity<UserClaim>().ToTable("UserClaims");
                modelBuilder.Entity<Role>().ToTable("Roles");


            }
        }
    }
}