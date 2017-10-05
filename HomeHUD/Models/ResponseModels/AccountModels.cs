using System;
using System.Collections.Generic;

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

    public class UserViewModel
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? LastLoginDate { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public IEnumerable<int> Roles { get; set; }
    }
}