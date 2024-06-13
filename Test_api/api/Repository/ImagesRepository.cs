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

      if(imagesModel == null)
      {
        return null;
      }

      _context.Images.Remove(imagesModel);
      await _context.SaveChangesAsync();
      return imagesModel;
    }

        public async Task<List<Images>> GetAllAsync()
    {
      return await _context.Images.ToListAsync();
    }

    public async Task<Images?> GetByIdAsync(int id)
    {
      return await _context.Images.FindAsync(id);
    }

    public async Task<Images?> UpdateAsync(int id, Images imagesModel)
    {
      var existingImages = await _context.Images.FindAsync(id);

      if(existingImages == null)
      {
        return null;
      }

      existingImages.Title = imagesModel.Title;
      existingImages.Description = imagesModel.Description;
      existingImages.ImageURL = imagesModel.ImageURL;
      
      await _context.SaveChangesAsync();

      return existingImages;
    }
  }
}