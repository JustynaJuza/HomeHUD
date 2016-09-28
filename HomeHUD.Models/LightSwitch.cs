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

    public class LightSwitch
    {
        public int Id { get; set; }
        public LightSwitchState State { get; set; }
        public string Color { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }

    }


    public class Room
    {
        public int Id { get; set; }
        public int RoomName { get; set; }
        public ICollection<LightSwitch> Lights { get; set; }
    }

    public class LightSwitchViewModel
    {
        public int Id { get; set; }
        public LightSwitchState State { get; set; }
        public string Color { get; set; }
        public int RoomIndex { get; set; }
    }

    public class LightsState
    {
        public ICollection<LightSwitchViewModel> All { get; set; }
    }
}