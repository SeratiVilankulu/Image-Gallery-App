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
    private readonly ILogger<ImagesRepository> _logger;
    public ImagesRepository(ApplicationDBContext context, ILogger<ImagesRepository> logger)
    {
      _context = context;
      _logger = logger;
    }

    public async Task<Images> CreateAsync(CreateImagesDto imagesDto, int categoryID, string userId)
    {
      var tagIds = new List<int>();

      var image = new Images
      {
        Title = imagesDto.Title,
        Description = imagesDto.Description,
        ImageURL = imagesDto.ImageURL,
        CategoryId = categoryID,
        AppUserId = userId
      };

      _context.Images.Add(image);
      await _context.SaveChangesAsync();

      _logger.LogInformation("Image saved with ID: {ImageID}", image.ImageID);

      foreach (var tagName in imagesDto.ImageTags)
      {
        // Split the tags by comma
        var tags = tagName.Split(",")
                          .Select(t => t.Trim())
                          .Where(t => !string.IsNullOrEmpty(t));

        foreach (var tag in tags)
        {
          // Check if the tag already exists in the Tags table
          var existingTag = await _context.Tags.FirstOrDefaultAsync(t => t.TagName == tag);

          int tagId;

          if (existingTag != null)
          {
            // If the tag exists, use its ID
            tagId = existingTag.TagID;
          }
          else
          {
            // If the tag doesn't exist, add it to the Tags table
            var newTag = new Tags { TagName = tag };
            _context.Tags.Add(newTag);
            await _context.SaveChangesAsync();
            _logger.LogInformation("New tag '{Tag}' added with ID: {TagID}", tag, newTag.TagID);
            tagId = newTag.TagID;
          }

          // Create the connection between the image and the tag
          var imageTag = new ImageTags
          {
            ImageID = image.ImageID,
            TagID = tagId
          };
          _context.ImageTags.Add(imageTag);
        }
      }

      await _context.SaveChangesAsync();

      return image;
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

    public async Task<List<Images>> GetByUserIdAsync(string userId)
    {
      return await _context.Images
        .Where(i => i.AppUserId == userId)
        .Include(c => c.Comments)
        .ToListAsync();
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

      await _context.SaveChangesAsync();

      return existingImages;
    }
  }
}