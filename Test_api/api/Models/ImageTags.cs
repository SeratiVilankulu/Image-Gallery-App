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
    public int TagID { get; set; }
    public int ImageID { get; set; }
    public Tags Tags { get; set; }
    public Images Images { get; set; }

  }
}