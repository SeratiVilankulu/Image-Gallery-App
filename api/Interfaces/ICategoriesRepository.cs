using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Categories;
using api.Models;
using api.Queries;

namespace api.Interfaces
{
  public interface ICategoriesRepository
  {
    Task<List<Categories>> GetAllAsync(QueryObject query);
    Task<Categories?> GetByIdAsync(int id);
    Task<Categories> CreateAsync(Categories categoriesModel);
    Task<Categories?> UpdateAsync(int id, UpdateCategoriesRequestDto categoriesDto);
    Task<Categories?> DeleteAsync(int id);
    Task<bool> CategoryExists(int id);
  }
}