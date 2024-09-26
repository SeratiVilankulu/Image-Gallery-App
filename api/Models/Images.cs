using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("Images")]
  public class Images
  {
    [Key]
    public int ImageID { get; set; }  // Primary key for Images

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageURL { get; set; } = string.Empty;
    public string SecretEditLink { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; } = DateTime.Now;

    // Foreign key property for Categories
    public int? CategoryId { get; set; }  // Nullable, if an image may not be linked to a category

    // Navigation property to Categories
    public Categories? Categories { get; set; }  // Navigation to the Categories entity
    public string? AppUserId { get; set; }
    public AppUser? AppUsers { get; set; }
    public List<Comments> Comments { get; set; } = new List<Comments>();

    // Navigation property for many-to-many relationship with ImageTags
    public List<ImageTags> ImageTags { get; set; } = new List<ImageTags>();
  }

}