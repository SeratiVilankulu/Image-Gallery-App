using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Users;
using api.Models;

namespace api.Mappers
{
  public static class UserMappers
  {
    public static UsersDto ToUserDto(this Users usersModel)
    {
      return new UsersDto
      {
        UserID = usersModel.UserID,
        FirstName = usersModel.FirstName,
        LastName = usersModel.LastName,
        UserName = usersModel.UserName,
        Email = usersModel.Email,
        Password = usersModel.Password,
        PasswordChangeDate = usersModel.PasswordChangeDate,
        ProfileCreateDate = usersModel.ProfileCreateDate,
        Images = usersModel.Images.Select(c => c.ToImagesDto()).ToList()
      };
    }

    public static Users ToUsersFromCreateDTO(this CreateUsersRequestDto usersDto)
    {
      return new Users
      {
        FirstName = usersDto.FirstName,
        LastName = usersDto.LastName,
        UserName = usersDto.UserName,
        Email = usersDto.Email,
        Password = usersDto.Password,
        PasswordChangeDate = usersDto.PasswordChangeDate,
        ProfileCreateDate = usersDto.ProfileCreateDate
      };
    }
  }
}