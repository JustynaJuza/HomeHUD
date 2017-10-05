namespace HomeHUD.Models
{
    public class InitialSpaData
    {
        public string baseUrl { get; set; }
        public bool isAuthenticated { get; set; }
        public bool disableServerSideRendering { get; set; }
    }

    public class AppOptions
    {
        public bool ShowDetailedErrors { get; set; }
        public bool DisableServerSideRendering { get; set; }
    }
}
