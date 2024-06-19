using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
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

    public async Task<List<Comments>> GetAllAsync()
    {
      return await _context.Comments.ToListAsync();
    }

    public async Task<Comments?> GetByIdAsync(int id)
    {
      return await _context.Comments.Include(a => a.CommentID).FirstOrDefaultAsync(c => c.CommentID == id);
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