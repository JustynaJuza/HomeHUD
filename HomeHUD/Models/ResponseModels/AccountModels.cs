namespace HomeHUD.Models.ResponseModels
{
    public class LoginResponse : FormResultResponse
    {
        public class _User
        {
            public string Name { get; set; }
        }

        public _User User { get; set; }
    }
}