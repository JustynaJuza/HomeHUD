namespace HomeHUD.Services
{
    public class MiLightCommands
    {
        public string On { get; set; } = "ON";
        public string Off { get; set; } = "OFF";
        public string Brightness { get; set; } = "BRIGHTNESS";
        public string White { get; set; } = "WHITE";
        public string Color { get; set; } = "COLOR";
        public string Disco { get; set; } = "DISCO";
    }

    public static class MiLightOptions
    {
        public class Formatting
        {
            public string Prefix { get; set; }
            public MiLightCommands Commands { get; set; }
        }
    }
}
