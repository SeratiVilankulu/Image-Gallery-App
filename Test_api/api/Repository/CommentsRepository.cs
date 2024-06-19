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
    public async Task<List<Comments>> GetAllAsync()
    {
      return await _context.Comments.ToListAsync();
    }

    public async Task<Comments?> GetByIdAsync(int id)
    {
      return await _context.Comments.Include(a => a.CommentID).FirstOrDefaultAsync(c => c.CommentID == id);
    }
  }
}