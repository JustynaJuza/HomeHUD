using System.Collections.Generic;

namespace HomeHUD.Models
{
    public enum LightSwitchState
    {
        Off = 0,
        On = 1,
        SwitchingOn = 2,
        SwitchingOff = 3
    }

    public class Light
    {
        public int Id { get; set; }
        public LightSwitchState State { get; set; }
        public string Color { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }

    }


    public class Room
    {
        public Room()
        {
            SortWeight = short.MaxValue;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public short SortWeight { get; set; }
        public string Hash { get; set; }
        public ICollection<Light> Lights { get; set; }
    }

    public class LightViewModel
    {
        public int Id { get; set; }
        public LightSwitchState State { get; set; }
        public string Color { get; set; }
        public int RoomId { get; set; }
    }

    public class LightStateViewModel
    {
        public int LightId { get; set; }
        public LightSwitchState State { get; set; }
    }

    public class SwitchAllLightsViewModel
    {
        public int[] LightIds { get; set; }
        public LightSwitchState State { get; set; }
    }

    public class LightsState
    {
        public ICollection<LightViewModel> All { get; set; }
    }

    public class RoomViewModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public int sortWeight { get; set; }
        public string hash { get; set; }
        public IEnumerable<int> lights { get; set; }
    }
}