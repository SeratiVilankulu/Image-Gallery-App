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
  [Route("api/imagetags")]
  [ApiController]
  public class ImageTagsController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly IImagesRepository _imagesRepo;
    private readonly IImageTagsRepository _imageTagsRepo;
    public ImageTagsController(UserManager<Images> userManager,
    IImagesRepository imagesRepo, IImageTagsRepository imageTagsRepo)
    {
      _userManager = userManager;
      _imagesRepo = imagesRepo;
      _imageTagsRepo = imageTagsRepo;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserImageTags()
    {
      var title = User.GetTitle();
      var images = await _userManager.FindByNameAsync(title);
      var ImageTags = await _imageTagsRepo.GetUserImageTags(images);
      return Ok(ImageTags);
    }
  }
}