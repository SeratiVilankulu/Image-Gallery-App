using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class Users
  {
    [Key]
    public int UserID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty;
    public DateTime PasswordChangeDate { get; set; }
    public DateTime ProfileCreateDate { get; set; }= DateTime.Now; 
    public List<Images> Images { get; set; } = new List<Images>();
  }
}