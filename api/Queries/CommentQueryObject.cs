using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Queries
{
  public class CommentQueryObject
  {
    public string? UserName { get; set; }
    public bool IsDecsending { get; set; } = true;
  }
}