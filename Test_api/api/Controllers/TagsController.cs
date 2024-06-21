using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tags;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Route("api/tags")]
  [ApiController]
  public class TagsController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly ITagsRepository _tagsRepo;
    public TagsController(ApplicationDBContext context, ITagsRepository tagsRepo)
    {
      _tagsRepo = tagsRepo;
      _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
      var tags = await _tagsRepo.GetAllAsync();

      var tagsDto = tags.Select(s => s.ToTagsDto());

      return Ok(tags);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var tag = await _tagsRepo.GetByIdAsync(id);

      if (tag == null)
      {
        return NotFound();
      }

      return Ok(tag.ToTagsDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTagsRequestDto tagsDto)
    {
      var tagsModel = tagsDto.ToTagsFromCreateDto();
      await _tagsRepo.CreateAsync(tagsModel);
      return CreatedAtAction(nameof(GetById), new { id = tagsModel.TagID }, tagsModel.ToTagsDto());
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTagsRequestDto updateDto)
    {
      var tagsModel = await _tagsRepo.UpdateAsync(id, updateDto);

      if (tagsModel == null)
      {
        return NotFound();
      }

      return Ok(tagsModel.ToTagsDto());
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var tagsModel = await _tagsRepo.DeleteAsync(id);

      if (tagsModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}