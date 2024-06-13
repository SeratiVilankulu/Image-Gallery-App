using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
  public interface IImagesRepository
  {
    Task<List<Images>> GetAllAsync();
    Task<Images?> GetByIdAsync(int id);
    Task<Images> CreateAsync(Images imagesModel);
    Task<Images?> UpdateAsync(int id, Images imagesModel);
    Task<Images?> DeleteAsync(int id);
  }
}