using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeHUD.Models.DbContext
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
            context.Rooms.RemoveRange(context.Rooms);
            context.SaveChanges();

            if (!context.Set<Room>().Any())
            {
                Seed(context);
            }
        }

        private static async void Seed(ApplicationDbContext context)
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
    }
}
