using HomeHUD.Models.Extensions;
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

            var roles = Enum.GetValues(typeof(RoleName)).Cast<RoleName>();
            var roleNames = roles.Select(x => x.ToString());

            var existingRoles = context.Roles.WhereFilterIsEmptyOrContains(x => x.Name, roleNames).Select(x => x.Name);

            foreach (var role in roleNames.Except(existingRoles))
            {
                inserts.Add(
                    context.Set<Role>().AddAsync(new Role
                    {
                        Name = role,
                        NormalizedName = role.ToUpperInvariant()
                    }));
            }

            await Task.WhenAll(inserts);
            await context.SaveChangesAsync();
        }
    }
}
