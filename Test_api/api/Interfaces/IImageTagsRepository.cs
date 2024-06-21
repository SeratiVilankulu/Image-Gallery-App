using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
  public interface IImageTagsRepository
  {
    Task<List<Images>> GetUserImageTags(Tags tag);
  }
}