using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Users;
using api.Interfaces;
using api.Mappers;
using api.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Route("api/user")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly IUsersRepository _usersRepo;
    public UserController(ApplicationDBContext context, IUsersRepository usersRepo)
    {
      _usersRepo = usersRepo;
      _context = context;
    }  

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var users = await _usersRepo.GetAllAsync(query);
      
      var usersDto = users.Select(s => s.ToUserDto());

      return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);
        
      var user = await _usersRepo.GetByIdAsync(id);
      if(user == null)
      {
        return NotFound();
      }
      
      return Ok(user.ToUserDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUsersRequestDto usersDto)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var  usersModel = usersDto.ToUsersFromCreateDTO();
      await _usersRepo.CreateAsync(usersModel);
      return CreatedAtAction(nameof(GetById), new {id = usersModel.UserID}, usersModel.ToUserDto());
    }

    [HttpPut]
    [Route("{id:int}")]

    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsersRequestDto updateDto)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var usersModel = await _usersRepo.UpdateAsync(id, updateDto);
      
      if(usersModel == null)
      {
        return NotFound();
      }

      return Ok(usersModel.ToUserDto());
    }

    [HttpDelete]
    [Route("{id:int}")]

    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if(!ModelState.IsValid)
        return BadRequest(ModelState);

      var usersModel = await _usersRepo.DeleteAsync(id);

      if(usersModel == null)
      {
        return NotFound();
      }

      return NoContent();

    }
  }
}