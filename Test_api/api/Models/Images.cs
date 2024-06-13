using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  public class Images
{
    [Key]
    public int ImageID { get; set; }  // Primary key for Images

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageURL { get; set; } = string.Empty;
    public string SecretEditLink { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }

    // Foreign key property for Users
    public int? UserId { get; set; }  // Nullable, if an image may not be linked to a user

    // Navigation property to Users
    public Users? User { get; set; }  // Navigation to the Users entity

    // Foreign key property for Categories
    public int? CategoryId { get; set; }  // Nullable, if an image may not be linked to a category

    // Navigation property to Categories
    public Categories? Category { get; set; }  // Navigation to the Categories entity
}

}