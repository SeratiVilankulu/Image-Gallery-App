using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Password
{
  public class ResetPasswordDto
  {
    // The email address of the user requesting the password reset.
    public string Email { get; set; }
    // The token that was sent to the user's email for password reset verification.
    public string Token { get; set; }
    // The new password that the user wants to set.
    public string Password { get; set; }
    // Confirmation of the new password.
    public string ConfirmPassword { get; set; }
  }
}

