using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Images
{
  public class ImagesDto
  {
    public int ImageID { get; set; } 
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageURL { get; set; } = string.Empty;
    public string SecretEditLink { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }
  }
}