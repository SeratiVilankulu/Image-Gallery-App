using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("UserImages")]
  public class UserImages
  {
    public int UserImagesID { get; set; }
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public int ImageID { get; set; }
    public Images Images { get; set; }
  }
}