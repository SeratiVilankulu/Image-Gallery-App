using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [Route("api/userimages")]
  [ApiController]
  public class UserImagesController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly IImagesRepository _imagesRepo;
    private readonly IUserImagesRepository _userImagesRepo;
    public UserImagesController(UserManager<AppUser> userManager, IImagesRepository imagesRepo, IUserImagesRepository userImagesRepo)
    {
      _userManager = userManager;
      _imagesRepo = imagesRepo;
      _userImagesRepo = userImagesRepo;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserUserImages()
    {
      var username = User.GetUsername();
      var appUser = await _userManager.FindByNameAsync(username);
      var UserImages = await _userImagesRepo.GetUserUserImages(appUser);
      return Ok(UserImages);
    }
  }
}