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

            if (!context.Rooms.Any())
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
