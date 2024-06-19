using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comments
{

  public class CommentsDto
  {
    public int CommentID { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public int? ImageID { get; set; }
  }
}