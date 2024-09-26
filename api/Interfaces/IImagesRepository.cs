using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Images;
using api.Models;

namespace api.Interfaces
{
  public interface IImagesRepository
  {
    Task<List<Images>> GetAllAsync();
    Task<Images?> GetByIdAsync(int id);
    Task<List<Images>> GetByUserIdAsync(string userId);
    Task<Images> CreateAsync(CreateImagesDto imagesDto, int categoryID, string userId);
    Task<Images?> UpdateAsync(int id, UpdateImagesRequestDto imagesDto);
    Task<Images?> DeleteAsync(int id);
    Task<bool> ImageExists(int id);
  }
}