using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Tags;
using api.Models;

namespace api.Interfaces
{
  public interface ITagsRepository
  {
    Task<List<Tags>> GetAllAsync();
    Task<Tags?> GetByIdAsync(int id);
    Task<Tags> CreateAsync(Tags tagsModel);
    Task<Tags?> UpdateAsync(int id, UpdateTagsRequestDto tagsDto);
    Task<Tags?> DeleteAsync(int id);
  }
}