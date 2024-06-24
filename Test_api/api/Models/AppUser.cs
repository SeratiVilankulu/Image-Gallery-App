using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateOnly PasswordChangeDate { get; set; }
        public DateOnly ProfileCreatedDate { get; set; }
        public List<Images> Images { get; set; } = new List<Images>();
        public List<Comments> Comments { get; set; } = new List<Comments>();
    }
}