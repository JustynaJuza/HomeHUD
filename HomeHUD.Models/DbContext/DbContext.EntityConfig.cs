
using HomeHUD.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
                modelBuilder.Entity<Role>().ToTable("Roles");
                modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins");
                modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims");
                modelBuilder.Entity<IdentityUserToken<int>>().ToTable("UserTokens");
                modelBuilder.Entity<IdentityUserRole<int>>().ToTable("UserRoles");
                modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims");
            }

            internal static void ConfigureRelationships(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<RoomLight>()
                    .HasKey(x => new { x.RoomId, x.LightId });

                modelBuilder.Entity<RoomLight>()
                    .HasOne(x => x.Room)
                    .WithMany(y => y.RoomLights)
                    .HasForeignKey(x => x.RoomId);

                modelBuilder.Entity<RoomLight>()
                    .HasOne(x => x.Light)
                    .WithMany(y => y.RoomLights)
                    .HasForeignKey(x => x.LightId);
            }
        }
    }
}