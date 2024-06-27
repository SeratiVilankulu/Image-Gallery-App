using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class ImageTags
  {
    [Key]
    public int ImageTagID { get; set; }
    public int ImageID { get; set; }
    public int TagID { get; set; }
    public Images Images { get; set; }
    public Tags Tags { get; set; }
  }
}