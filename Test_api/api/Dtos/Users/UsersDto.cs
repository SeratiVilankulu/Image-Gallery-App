using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Images;

namespace api.Dtos.Users
{
    public class UsersDto
    {
        public int UserID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty;
    public DateTime PasswordChangeDate { get; set; }
    public DateTime ProfileCreateDate { get; set; }= DateTime.Now; 

    public List<ImagesDto> Images {get; set;}
    }
}