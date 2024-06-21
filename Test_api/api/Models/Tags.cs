using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class Tags
  {
    public int TagID { get; set; }
    public string TagName { get; set; } = string.Empty;
    public List<ImageTags> ImageTags { get; set; } = new List<ImageTags>();
  }
}