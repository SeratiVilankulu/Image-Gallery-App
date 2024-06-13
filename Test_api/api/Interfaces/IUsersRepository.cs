using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Users;
using api.Models;
using api.Queries;

namespace api.Interfaces
{
  public interface IUsersRepository
  {
    Task<List<Users>> GetAllAsync(QueryObject query);
    Task<Users?> GetByIdAsync(int id);
    Task<Users> CreateAsync(Users usersModel);
    Task<Users?> UpdateAsync(int id, UpdateUsersRequestDto usersDto);
    Task<Users?> DeleteAsync(int id);
    Task<bool> UserExists(int id);
  }
}