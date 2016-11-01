using System.Collections.Generic;

namespace HomeHUD.Models.Configurables
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
}