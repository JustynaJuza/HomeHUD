using System.ComponentModel.DataAnnotations;

namespace HomeHUD.Models.Identity.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
