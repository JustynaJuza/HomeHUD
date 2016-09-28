using HomeHUD.Models.DbContext;
using System.Collections.Generic;
using System.Linq;

namespace HomeHUD.Models.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            SetSqlGenerator("System.Data.SqlClient", new GenerateDateSqlServerMigrationSqlGenerator());
        }

        protected override void Seed(ApplicationDbContext context)
        {
            if (context.Set<Room>().Any()) return;

            context.Set<Room>().Add(new Room
            {
                Name = "Games room",
                Lights = new List<Light>
                {
                    new Light
                    {
                        State = LightSwitchState.On
                    },
                    new Light
                    {
                        State = LightSwitchState.SwitchingOff,

                    }
                }
            });

            context.Set<Room>().Add(new Room
            {
                Name = "Bedroom",
                Lights = new List<Light>
                {
                    new Light
                    {
                        State = LightSwitchState.Off
                    }
                }
            });


            context.Set<Room>().Add(new Room
            {
                Name = "Living room",
                Lights = new List<Light>
                {
                    new Light
                    {
                        State = LightSwitchState.SwitchingOn
                    }
                }
            });
        }
    }
}
