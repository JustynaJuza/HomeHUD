using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace HomeHUD.Models.DbContext
{
    public partial class ApplicationDbContext
    {
        public static class ConventionsConfig
        {
            internal static void SetPropertyConventions(ModelBuilder modelBuilder)
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    foreach (var property in entityType.GetProperties())
                    {
                        SetDateTime2ColumnForDate(property);
                        SetDateCreatedInsert(property);
                        SetDateUpdatedInsert(property);
                    }
                }
            }

            private static void SetDateTime2ColumnForDate(IMutableProperty property)
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.Relational().ColumnType = "datetime2";
                }
            }

            private static void SetDateCreatedInsert(IMutableProperty property)
            {
                if (property.Name == "DateCreated")
                {
                    property.ValueGenerated = ValueGenerated.OnAdd;
                    property.IsStoreGeneratedAlways = true;
                    property.Relational().DefaultValueSql = "GETDATE()";
                }
            }

            private static void SetDateUpdatedInsert(IMutableProperty property)
            {
                if (property.Name == "DateModified"
                    || property.Name == "DateUpdated")
                {
                    property.ValueGenerated = Microsoft.EntityFrameworkCore.Metadata.ValueGenerated.OnAddOrUpdate;
                    property.IsStoreGeneratedAlways = true;
                    property.Relational().DefaultValueSql = "GETDATE()";
                }
            }
        }
    }
}