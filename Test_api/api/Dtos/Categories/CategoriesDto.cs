using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Images;

namespace api.Dtos.Categories
{
  public class CategoriesDto
  {
    public int CategoryID { get; set; } 
    public string CategoryType { get; set; } = string.Empty;
    public int Total { get; set; }
     public List<ImagesDto> Images {get; set;} 
  }
}