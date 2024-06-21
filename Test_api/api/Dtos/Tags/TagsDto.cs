using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Tags
{
  public class TagsDto
  {
    public int TagID { get; set; }
    public string TagName { get; set; } = string.Empty;
  }
}