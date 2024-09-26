using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Categories;
using api.Models;

namespace api.Mappers
{
  public static class CategoriesMappers
  {
    public static CategoriesDto ToCategoryDto(this Categories categoriesModel)
    {
      return new CategoriesDto
      {
        CategoryID = categoriesModel.CategoryID,
        CategoryType = categoriesModel.CategoryType,
        Total = categoriesModel.Total,
        Images = categoriesModel.Images.Select(c => c.ToImagesDto()).ToList()
      };
    }

    public static Categories ToCategoriesFromCreateDTO(this CreateCategoriesRequestDto categoriesDto)
    {
      return new Categories
      {
        CategoryType = categoriesDto.CategoryType,
        Total = categoriesDto.Total,
      };
    }
  }
}