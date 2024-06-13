using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Images
{
  public class UpdateImagesRequestDto
  {
    [Required]
    [MinLength(1, ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;
    [Required]
    [MaxLength(280, ErrorMessage = "Description cannot be over 280 characters")]
    public string Description { get; set; } = string.Empty;
    [Required]
    [MaxLength(280, ErrorMessage = "Image is required")]
    public string ImageURL { get; set; } = string.Empty; 
  }
}