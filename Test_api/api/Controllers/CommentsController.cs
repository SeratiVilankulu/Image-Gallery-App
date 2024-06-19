using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
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
    private readonly IImagesRepository _imagesRepo;
    public CommentsController(ICommentsRepository commentsRepo, IImagesRepository imagesRepo)
    {
      _commentsRepo = commentsRepo;
      _imagesRepo = imagesRepo;
    }

    [HttpGet("{id}")]
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

    [HttpPost("{imagesID}")]

    public async Task<IActionResult> Create([FromRoute] int imagesID, CreateCommentsDto commentsDto)
    {
      if (!await _imagesRepo.ImageExists(imagesID))
      {
        return BadRequest("Image doesn not exist");
      }

      var commentsModel = commentsDto.ToCommentsFromCreate(imagesID);
      await _commentsRepo.CreateAsync(commentsModel);
      return CreatedAtAction(nameof(GetById), new { id = commentsModel.CommentID }, commentsModel.ToCommentsDto());
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentsRequestDto updateDto)
    {
      var comments = await _commentsRepo.UpdateAsync(id, updateDto.ToCommentsFromUpdate());

      if (comments == null)
      {
        return NotFound("Comment no available");
      }

      return Ok(comments.ToCommentsDto());
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var commentsModel = await _commentsRepo.DeleteAsync(id);

      if (commentsModel == null)
      {
        return NotFound("Comment does not exist");
      }

      return Ok(commentsModel);
    }
  }
}