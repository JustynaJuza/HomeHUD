using HomeHUD.Models.Extensions;
using HomeHUD.Models.Identity;
using Microsoft.EntityFrameworkCore;
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
                    RoomLights = new[] {
                        new RoomLight {
                            Light = new Light {
                                Id = 1,
                                State = LightSwitchState.Off }
                        }
                    }
                }));

            inserts.Add(
                context.Set<Room>().AddAsync(new Room
                {
                    Name = "Bedroom",
                    SortWeight = 20,
                    Hash = "bed",
                    RoomLights = new[] {
                        new RoomLight {
                            Light = new Light {
                                Id = 4,
                                State = LightSwitchState.Off }
                        }
                    }
                }));


            inserts.Add(
                context.Set<Room>().AddAsync(new Room
                {
                    Name = "Living room",
                    SortWeight = 30,
                    Hash = "living",
                    RoomLights = new[] {
                        new RoomLight {
                            Light = new Light {
                                Id = 2,
                                State = LightSwitchState.Off }
                        },
                        new RoomLight {
                            Light = new Light {
                                Id = 3,
                                State = LightSwitchState.Off }
                        }
                    }
                }));

            await Task.WhenAll(inserts);
            context.Database.OpenConnection();
            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Lights ON;");
            await context.SaveChangesAsync();
            context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Lights OFF;");
            context.Database.CloseConnection();
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
