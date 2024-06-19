using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("ImageTags")]
  public class ImageTags
  {
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public int ImageID { get; set; }
    public Images Images { get; set; }

  }
}