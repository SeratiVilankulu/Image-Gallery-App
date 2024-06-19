using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comments
{
  public class CreateCommentsDto
  {
    public string Comment { get; set; } = string.Empty;
  }
}