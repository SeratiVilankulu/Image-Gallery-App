using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Users
{
  public class CreateUsersRequestDto
  {
    [Required]
    [MinLength(3, ErrorMessage = "Please enter full first name")]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    [MinLength(3, ErrorMessage = "Please enter full last name")]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [MinLength(5, ErrorMessage = "Username of more than 5 characters is required")]
    public string UserName { get; set; } = string.Empty;
    [Required]
    [MinLength(5, ErrorMessage = "Email is required")]
    public string Email { get; set; } = string.Empty;
    [Required]
    [MinLength(16, ErrorMessage = "Password is not of required length, Please try again")]
    public string Password { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty;
    public DateTime PasswordChangeDate { get; set; }
    public DateTime ProfileCreateDate { get; set; }= DateTime.Now; 
    }
}