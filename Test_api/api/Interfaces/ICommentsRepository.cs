using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Queries;

namespace api.Interfaces
{
  public interface ICommentsRepository
  {
    Task<List<Comments>> GetAllAsync(CommentQueryObject queryObject);
    Task<Comments?> GetByIdAsync(int id);
    Task<List<Comments>> GetByImageIdAsync(int imageId);
    Task<Comments> CreateAsync(Comments commentsModel);
    Task<Comments?> UpdateAsync(int id, Comments commentsModel);
    Task<Comments?> DeleteAsync(int id);
  }
}
