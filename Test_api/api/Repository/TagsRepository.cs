using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tags;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class TagsRepository : ITagsRepository
  {
    private readonly ApplicationDBContext _context;
    public TagsRepository(ApplicationDBContext context)
    {
      _context = context;
    }
    public async Task<Tags> CreateAsync(Tags tagsModel)
    {
      await _context.Tags.AddAsync(tagsModel);
      await _context.SaveChangesAsync();
      return tagsModel;
    }

    public async Task<Tags?> DeleteAsync(int id)
    {
      var tagsModel = await _context.Tags.FirstOrDefaultAsync(x => x.TagID == id);

      if (tagsModel == null)
      {
        return null;
      }

      _context.Tags.Remove(tagsModel);
      await _context.SaveChangesAsync();
      return tagsModel;
    }

    public async Task<List<Tags>> GetAllAsync()
    {
      return await _context.Tags.ToListAsync();
    }

    public async Task<Tags?> GetByIdAsync(int id)
    {
      return await _context.Tags.FindAsync(id);
    }

    public async Task<Tags?> UpdateAsync(int id, UpdateTagsRequestDto tagsDto)
    {
      var existingTag = await _context.Tags.FirstOrDefaultAsync(x => x.TagID == id);

      if (existingTag == null)
      {
        return null;
      }

      existingTag.TagName = tagsDto.TagName;

      await _context.SaveChangesAsync();

      return existingTag;
    }
  }
}