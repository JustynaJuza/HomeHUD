namespace HomeHUD.Models
{
    public class AppState
    {
        public NavigationState Navigation { get; set; }
        public LightsState Lights { get; set; }
        public AppConfiguration Config { get; set; }

        public class NavigationState { }
        public class AppConfiguration
        {
            public RoomViewModel[] Rooms { get; set; }
        }
    }
}
