namespace HomeHUD.Models
{
    public class RoomLight
    {
        public int RoomId { get; set; }
        public Room Room { get; set; }
        public int LightId { get; set; }
        public Light Light { get; set; }
    }
}