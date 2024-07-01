using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Images;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class ImagesRepository : IImagesRepository
  {
    private readonly ApplicationDBContext _context;
    public ImagesRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<Images> CreateAsync(Images imagesModel)
    {
      await _context.Images.AddAsync(imagesModel);
      await _context.SaveChangesAsync();
      return imagesModel;
    }

    public async Task<Images?> DeleteAsync(int id)
    {
      var imagesModel = await _context.Images.FirstOrDefaultAsync(x => x.ImageID == id);

      if (imagesModel == null)
      {
        return null;
      }

      _context.Images.Remove(imagesModel);
      await _context.SaveChangesAsync();
      return imagesModel;
    }

    public async Task<List<Images>> GetAllAsync()
    {
      return await _context.Images.Include(c => c.Categories)
      .Include(t => t.ImageTags)
      .ThenInclude(t => t.Tags)
      .Include(c => c.Comments)
      .ThenInclude(a => a.AppUsers).ToListAsync();

    }

    public async Task<Images?> GetByIdAsync(int id)
    {
      return await _context.Images
        .Include(i => i.Comments)
        .ThenInclude(c => c.AppUsers)  // Include the AppUsers relation
        .FirstOrDefaultAsync(i => i.ImageID == id);
    }


    public Task<bool> ImageExists(int id)
    {
      return _context.Images.AnyAsync(s => s.ImageID == id);
    }

    public async Task<Images?> UpdateAsync(int id, UpdateImagesRequestDto imagesDto)
    {
      var existingImages = await _context.Images.FindAsync(id);

      if (existingImages == null)
      {
        return null;
      }

      existingImages.Title = imagesDto.Title;
      existingImages.Description = imagesDto.Description;
      existingImages.ImageURL = imagesDto.ImageURL;

      await _context.SaveChangesAsync();

      return existingImages;
    }
  }
}