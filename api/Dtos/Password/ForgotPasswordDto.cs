using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Password
{
  public class ForgotPasswordDto
  {
    [Required]
    // The email address of the user requesting the password reset.
    public string? Email { get; set; }
  }
}