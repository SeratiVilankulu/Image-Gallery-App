using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("Comments")]
  public class Comments
  {
    [Key]
    public int CommentID { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.Now;

    // Foreign key for Images
    public int? ImageID { get; set; }
    public Images? Image { get; set; }  // Navigation to the Images entity
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }


  }
}