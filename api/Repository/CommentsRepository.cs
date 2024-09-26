using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using api.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class CommentsRepository : ICommentsRepository
  {
    private readonly ApplicationDBContext _context;
    public CommentsRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<Comments> CreateAsync(Comments commentsModel)
    {
      await _context.Comments.AddAsync(commentsModel);
      await _context.SaveChangesAsync();
      return commentsModel;
    }

    public async Task<Comments?> DeleteAsync(int id)
    {
      var commetsModel = await _context.Comments.FirstOrDefaultAsync(x => x.CommentID == id);

      if (commetsModel == null)
      {
        return null;
      }

      _context.Comments.Remove(commetsModel);
      await _context.SaveChangesAsync();
      return commetsModel;
    }

    public async Task<List<Comments>> GetAllAsync(CommentQueryObject queryObject)
    {
      var comments = _context.Comments.Include(a => a.AppUsers).AsQueryable();

      if (!string.IsNullOrWhiteSpace(queryObject.UserName))
      {
        comments = comments.Where(s => s.AppUsers.UserName == queryObject.UserName);
      };
      if (queryObject.IsDecsending == true)
      {
        comments = comments.OrderByDescending(c => c.CreatedOn);
      }

      return await comments.ToListAsync();
    }

    public async Task<Comments?> GetByIdAsync(int id)
    {
      return await _context.Comments.Include(a => a.AppUsers).FirstOrDefaultAsync(c => c.CommentID == id);
    }

    public async Task<List<Comments>> GetByImageIdAsync(int imageId)
    {
      return await _context.Comments
      .Where(c => c.ImageID == imageId)
      .Include(c => c.AppUsers)
      .ToListAsync();
    }

    public async Task<Comments?> UpdateAsync(int id, Comments commentsModel)
    {
      var existingComment = await _context.Comments.FindAsync(id);

      if (existingComment == null)
      {
        return null;
      }

      existingComment.Comment = commentsModel.Comment;

      await _context.SaveChangesAsync();

      return existingComment;
    }
  }
}