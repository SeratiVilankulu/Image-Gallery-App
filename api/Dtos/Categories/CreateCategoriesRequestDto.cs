using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace api.Dtos.Categories
{
  public class CreateCategoriesRequestDto
  {
    public int CategoryID { get; set; } 
    [Required]
    [MinLength(3, ErrorMessage = "Please enter category type of image")]
    public string CategoryType { get; set; } = string.Empty;
    public int Total { get; set; }
  }
}