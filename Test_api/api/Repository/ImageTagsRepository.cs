using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class ImageTagsRepository : IImagesRepository
  {
    private readonly ApplicationDBContext _context;
    public ImageTagsRepository(ApplicationDBContext context)
    {
      _context = context;
    }
    public async Task<List<Images>> GetUserImageTags(Tags tag)
    {
      return await _context.UserImages.Where(u => u.TagID == tag.Id)
      .Select(images => new Images
      {
        ImageID = images.Images.ImageID,
        Title = images.Images.Title,
        Description = images.Images.Description,
        ImageURL = images.Images.ImageURL,
        UploadDate = images.Images.UploadDate
      }).ToListAsync();
    }
  }
}