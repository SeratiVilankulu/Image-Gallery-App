using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Categories;
using api.Interfaces;
using api.Mappers;
using api.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Route("api/category")]
  [ApiController]
  public class CategoriesController : ControllerBase
  {

    private readonly ApplicationDBContext _context;
    private readonly ICategoriesRepository _categoriesRepo;
    public CategoriesController(ApplicationDBContext context, ICategoriesRepository categoriesRepo)
    {
      _categoriesRepo = categoriesRepo;
      _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categories = await _categoriesRepo.GetAllAsync(query);

      var categoriesDto = categories.Select(s => s.ToCategoryDto());

      return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var category = await _categoriesRepo.GetByIdAsync(id);
      if (category == null)
      {
        return NotFound();
      }

      return Ok(category.ToCategoryDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoriesRequestDto categoriesDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoriesModel = categoriesDto.ToCategoriesFromCreateDTO();
      await _categoriesRepo.CreateAsync(categoriesModel);
      return CreatedAtAction(nameof(GetById), new { id = categoriesModel.CategoryID }, categoriesModel.ToCategoryDto());
    }

    [HttpPut]
    [Route("{id:int}")]

    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoriesRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoriesModel = await _categoriesRepo.UpdateAsync(id, updateDto);

      if (categoriesModel == null)
      {
        return NotFound();
      }

      return Ok(categoriesModel.ToCategoryDto());
    }

    [HttpDelete]
    [Route("{id:int}")]

    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoriesModel = await _categoriesRepo.DeleteAsync(id);

      if (categoriesModel == null)
      {
        return NotFound();
      }

      return NoContent();

    }
  }
}