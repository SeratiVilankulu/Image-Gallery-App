using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/comment")]
  [ApiController]
  public class CommentsController : ControllerBase
  {
    private readonly ICommentsRepository _commentsRepo;
    private readonly IImagesRepository _imagesRepo;
    private readonly UserManager<AppUser> _userManager;
    public CommentsController(ICommentsRepository commentsRepo,
    IImagesRepository imagesRepo, UserManager<AppUser> userManager)
    {
      _commentsRepo = commentsRepo;
      _imagesRepo = imagesRepo;
      _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
    {
      var comments = await _commentsRepo.GetAllAsync(queryObject);

      var commentsDto = comments.Select(s => s.ToCommentsDto());

      return Ok(commentsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var comment = await _commentsRepo.GetByIdAsync(id);

      if (comment == null)
      {
        return NotFound();
      }

      return Ok(comment.ToCommentsDto());
    }

    [HttpPost]
    [Route("{imagesID:int}")]
    public async Task<IActionResult> Create([FromRoute] int imagesID, CreateCommentsDto commentsDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (!await _imagesRepo.ImageExists(imagesID))
      {
        return BadRequest("Image does not exist");
      }

      var username = User.GetUsername();
      var appUser = await _userManager.FindByNameAsync(username);

      var commentsModel = commentsDto.ToCommentsFromCreate(imagesID);
      commentsModel.AppUserId = appUser.Id;
      await _commentsRepo.CreateAsync(commentsModel);
      return CreatedAtAction(nameof(GetById), new { id = commentsModel.CommentID }, commentsModel.ToCommentsDto());
    }

    [HttpPatch]
    [Route("{id:int}")]
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