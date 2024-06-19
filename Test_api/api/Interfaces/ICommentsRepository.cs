using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
  public interface ICommentsRepository
  {
    Task<List<Comments>> GetAllAsync();
    Task<Comments?> GetByIdAsync(int id);
    Task<Comments> CreateAsync(Comments commentsModel);
    Task<Comments?> UpdateAsync(int id, Comments commentsModel);
  }
}