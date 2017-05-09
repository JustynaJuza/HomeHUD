﻿
using HomeHUD.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext
    {
        public static class EntityConfig
        {
            internal static void ConfigureModelBuilder(ModelBuilder modelBuilder)
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