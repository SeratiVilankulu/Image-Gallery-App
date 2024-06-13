using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Images;
using api.Models;

namespace api.Mappers
{
  public static class ImageMapper
  {
    public static ImagesDto ToImagesDto(this Images imagesModel)
    {
      return new ImagesDto
      {
        ImageID = imagesModel.ImageID,
        Title = imagesModel.Title,
        Description = imagesModel.Description,
        ImageURL = imagesModel.ImageURL,
        SecretEditLink = imagesModel.SecretEditLink,
        UploadDate = imagesModel.UploadDate
      };
    }

    public static Images ToImagesFromCreate(this CreateImagesDto imagesDto, int userID)
    {
      return new Images
      {
        Title = imagesDto.Title,
        Description = imagesDto.Description,
        ImageURL = imagesDto.ImageURL,
        UserId = userID
      };
    }

    public static Images ToImagesFromUpdate(this UpdateImagesRequestDto imagesDto)
    {
      return new Images
      {
        Title = imagesDto.Title,
        Description = imagesDto.Description,
        ImageURL = imagesDto.ImageURL,
      };
    }
  }
}