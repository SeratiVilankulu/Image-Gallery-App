using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Categories;
using api.Interfaces;
using api.Models;
using api.Queries;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class CategoriesRepository : ICategoriesRepository
  {
    private readonly ApplicationDBContext _context;

    public CategoriesRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<Categories> CreateAsync(Categories categoriesModel)
    {
      await _context.Categories.AddAsync(categoriesModel);
      await _context.SaveChangesAsync();
      return categoriesModel;
    }

    public async Task<Categories?> DeleteAsync(int id)
    {
      var categoriesModel = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryID == id);

      if (categoriesModel == null)
      {
        return null;
      }

      _context.Categories.Remove(categoriesModel);
      await _context.SaveChangesAsync();
      return categoriesModel;
    }

    public async Task<List<Categories>> GetAllAsync(QueryObject query)
    {
      var categories = _context.Categories.Include(c => c.Images).AsQueryable();

      if (!string.IsNullOrWhiteSpace(query.CategoryType))
      {
        categories = categories.Where(s => s.CategoryType.Contains(query.CategoryType));
      }

      if (!string.IsNullOrWhiteSpace(query.CategoryType))
      {
        categories = categories.Where(s => s.CategoryType.Contains(query.CategoryType));
      }

      if (!string.IsNullOrWhiteSpace(query.SortBy))
      {
        if (query.SortBy.Equals("CategoryType", StringComparison.OrdinalIgnoreCase))
        {
          categories = query.IsDecsending ? categories.OrderByDescending(s => s.CategoryType) : categories.OrderBy(s => s.CategoryType);
        }
      }

      var skipNumber = (query.PageNumber - 1) * query.PageSize;

      return await categories.Skip(skipNumber).Take(query.PageSize).ToListAsync();
    }

    public async Task<Categories?> GetByIdAsync(int id)
    {
      return await _context.Categories.Include(c => c.Images).FirstOrDefaultAsync(i => i.CategoryID == id);
    }

    public Task<bool> CategoryExists(int id)
    {
      return _context.Categories.AnyAsync(s => s.CategoryID == id);
    }

    public async Task<Categories?> UpdateAsync(int id, UpdateCategoriesRequestDto categoriesDto)
    {
      var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryID == id);

      if (existingCategory == null)
      {
        return null;
      }

      existingCategory.CategoryType = categoriesDto.CategoryType;
      existingCategory.Total = categoriesDto.Total;

      await _context.SaveChangesAsync();

      return existingCategory;
    }
  }
}