using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Password
{
  public class ForgotPasswordDto
  {
    // The email address of the user requesting the password reset.
    public string Email { get; set; }
  }
}