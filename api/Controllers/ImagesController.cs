using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Images;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/images")]
  [ApiController]
  public class ImagesController : ControllerBase
  {
    private readonly IImagesRepository _imagesRepo;
    private readonly ICategoriesRepository _categoriesRepo;
    private readonly UserManager<AppUser> _userManager;

    public ImagesController(IImagesRepository imagesRepo, ICategoriesRepository categoriesRepo, UserManager<AppUser> userManager)
    {
      _imagesRepo = imagesRepo;
      _categoriesRepo = categoriesRepo;
      _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var images = await _imagesRepo.GetAllAsync();

      var imageDto = images.Select(s => s.ToImagesDto()).ToList();

      return Ok(imageDto);

    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var images = await _imagesRepo.GetByIdAsync(id);

      if (images == null)
      {
        return NotFound();
      }

      return Ok(images.ToImagesDto());
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(string userId)
    {
      var images = await _imagesRepo.GetByUserIdAsync(userId);
      if (images == null || !images.Any())
      {
        return NotFound("No images found for the given user.");
      }
      return Ok(images);
    }

    [HttpPost("{categoryID:int}")]
    public async Task<IActionResult> Create([FromRoute] int categoryID, CreateImagesDto imagesDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userName = User.GetUsername();
      var user = await _userManager.FindByNameAsync(userName);

      if (!await _categoriesRepo.CategoryExists(categoryID))
      {
        return BadRequest("Category does not exist");
      }

      // Pass both imagesDto and categoryID to CreateAsync
      var imagesModel = await _imagesRepo.CreateAsync(imagesDto, categoryID, user.Id);

      return CreatedAtAction(nameof(GetById), new { id = imagesModel.ImageID }, imagesModel.ToImagesDto());
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateImagesRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var images = await _imagesRepo.UpdateAsync(id, updateDto);

      if (images == null)
      {
        return NotFound("Image not found");
      }

      return Ok(images.ToImagesDto());
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var imagesModel = await _imagesRepo.DeleteAsync(id);

      if (imagesModel == null)
      {
        return NotFound("Image does not exist");
      }

      return Ok(imagesModel);
    }
  }
}