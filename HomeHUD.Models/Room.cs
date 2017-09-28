using System.Collections.Generic;

namespace HomeHUD.Models
{
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
        public ICollection<RoomLight> RoomLights { get; set; }
    }

    public class RoomViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public short SortWeight { get; set; }
        public string Hash { get; set; }
        public IEnumerable<int> Lights { get; set; }
    }
}