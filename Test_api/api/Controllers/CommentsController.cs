using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/comment")]
  [ApiController]
  public class CommentsController : ControllerBase
  {
    private readonly ICommentsRepository _commentsRepo;
    public CommentsController(ICommentsRepository commentsRepo)
    {
      _commentsRepo = commentsRepo;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
      var comments = await _commentsRepo.GetAllAsync();

      var commentsDto = comments.Select(s => s.ToCommentsDto());

      return Ok(commentsDto);
    }

    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var comment = await _commentsRepo.GetByIdAsync(id);

      if (comment == null)
      {
        return NotFound();
      }

      return Ok(comment.ToCommentsDto());
    }
  }
}