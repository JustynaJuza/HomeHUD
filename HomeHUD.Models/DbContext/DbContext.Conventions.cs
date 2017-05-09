using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext
    {
        public void UseDateTime2Convention(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    //Properties<DateTime>()
                    //    .Configure(c => c.HasColumnType("datetime2").HasPrecision(0));

                }
            }

        }

        public void DateCreatedIsGeneratedConvention(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    //Properties<DateTime>()
                    //.Where(x => x.Name == "DateCreated")
                    //.Configure(x => x.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed));
                }
            }
        }
    }
}