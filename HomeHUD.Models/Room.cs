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
        public ICollection<Light> Lights { get; set; }
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