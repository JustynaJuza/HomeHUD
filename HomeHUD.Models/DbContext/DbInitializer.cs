using HomeHUD.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeHUD.Models.DbContext
{
    public static class DbInitializer
    {
        public async static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            context.Roles.RemoveRange(context.Roles);
            context.SaveChanges();

            await SeedRoles(context);

            if (!context.Set<Room>().Any())
            {
                await SeedRooms(context);
            }
        }

        private static async Task SeedRooms(ApplicationDbContext context)
        {
            var inserts = new List<Task>();
            inserts.Add(
                context.Set<Room>().AddAsync(new Room
                {
                    Name = "Games room",
                    SortWeight = 10,
                    Hash = "gaming",
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
                }));

            inserts.Add(
                context.Set<Room>().AddAsync(new Room
                {
                    Name = "Bedroom",
                    SortWeight = 20,
                    Hash = "bed",
                    Lights = new List<Light>
                    {
                        new Light
                        {
                            State = LightSwitchState.Off
                        }
                    }
                }));


            inserts.Add(
                context.Set<Room>().AddAsync(new Room
                {
                    Name = "Living room",
                    SortWeight = 30,
                    Hash = "living",
                    Lights = new List<Light>
                    {
                        new Light
                        {
                            State = LightSwitchState.SwitchingOn
                        }
                    }
                }));

            await Task.WhenAll(inserts);
            await context.SaveChangesAsync();
        }

        private static async Task SeedRoles(ApplicationDbContext context)
        {
            var inserts = new List<Task>();

            foreach (var role in Enum.GetValues(typeof(RoleName)).Cast<RoleName>())
            {
                var roleName = role.ToString();
                var existingRole = context.Roles.FirstOrDefault(r => r.Name == roleName);
                if (existingRole == null)
                {
                    inserts.Add(
                        context.Set<Role>().AddAsync(new Role
                        {
                            Name = roleName,
                            NormalizedName = roleName.ToUpperInvariant()
                        }));
                }
            }

            await Task.WhenAll(inserts);
            await context.SaveChangesAsync();
        }
    }
}
