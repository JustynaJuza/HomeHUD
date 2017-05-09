﻿using HomeHUD.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        //        public ApplicationDbContext() : base("HomeHUD") { }

        //        public static ApplicationDbContext Create()
        //        {
        //            return new ApplicationDbContext();
        //        }

        //        public DbSet<Light> Lights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Conventions.Add(new UseDateTime2Convention());
            //modelBuilder.Conventions.Add(new DateCreatedIsGeneratedConvention());

            EntityConfig.ConfigureModelBuilder(modelBuilder);
        }
    }
}

//namespace HomeHUD.Models.DbContext
//{

//    public partial class ApplicationDbContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>
//    {
//        public ApplicationDbContext() : base("HomeHUD") { }

//        public static ApplicationDbContext Create()
//        {
//            return new ApplicationDbContext();
//        }

//        public DbSet<Light> Lights { get; set; }

//        protected override void OnModelCreating(DbModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);
//            modelBuilder.Conventions.Add(new UseDateTime2Convention());
//            modelBuilder.Conventions.Add(new DateCreatedIsGeneratedConvention());

//            EntityConfig.ConfigureModelBuilder(modelBuilder);
//        }
//    }
//}