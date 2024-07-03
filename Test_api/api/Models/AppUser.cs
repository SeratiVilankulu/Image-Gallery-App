using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
  public class AppUser : IdentityUser
  {

    public DateTime PasswordChangeDate { get; set; } = DateTime.Now;
    public DateTime ProfileCreatedDate { get; set; } = DateTime.Now;
    public List<Images> Images { get; set; } = new List<Images>();
    public List<Comments> Comments { get; set; } = new List<Comments>();
  }
}