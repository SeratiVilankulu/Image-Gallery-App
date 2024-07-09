using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Route("api/account")]
  [ApiController]

  public class AccountController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signinManager;
    private readonly EmailController _emailController;
    public AccountController(ApplicationDBContext context, UserManager<AppUser> userManager,
    ITokenService tokenService, SignInManager<AppUser> signInManager, EmailController emailController)
    {
      _context = context;
      _userManager = userManager;
      _tokenService = tokenService;
      _signinManager = signInManager;
      _emailController = emailController;
    }

    //Post: Account/Login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

      if (user == null) return Unauthorized("Invalid credentials!");

      var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (!result.Succeeded) return Unauthorized("Username not found and/or password inccorrect");

      return Ok(
        new NewUserDto
        {
          UserName = user.UserName,
          Email = user.Email,
          VerificationToken = _tokenService.CreateToken(user)
        }
      );
    }

    //Post: Account/Register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
      try
      {
        if (!ModelState.IsValid)
          return BadRequest(ModelState);

        // Generate a simple verification token using the token service
        string token = _tokenService.CreateToken(new AppUser { Email = registerDto.Email, UserName = registerDto.UserName });

        // Extract token expiry date
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
        var tokenExpires = jwtToken.ValidTo;

        // Create a new AppUser object with the verification token
        var appUser = new AppUser
        {
          UserName = registerDto.UserName,
          Email = registerDto.Email,
          VerificationToken = token,// Assign the verification token
          TokenExpires = tokenExpires
        };

        var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

        if (createdUser.Succeeded)
        {
          var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
          if (roleResult.Succeeded)
          {

            // Send the verification email
            await _emailController.SendVerificationEmail(appUser.Email, token);

            return Ok(
              new NewUserDto
              {
                UserName = appUser.UserName,
                Email = appUser.Email,
                VerificationToken = token // Return the same token for client use
              }
            );
          }
          else
          {
            return StatusCode(500, roleResult.Errors);
          }
        }
        else
        {
          return StatusCode(500, createdUser.Errors);
        }
      }
      catch (Exception e)
      {
        return StatusCode(500, e);
      }

    }

    //Registration Verification
    [HttpPost("verify")]
    public async Task<IActionResult> Verify(string token)
    {
      var user = await _userManager.Users.SingleOrDefaultAsync(u => u.VerificationToken == token && u.TokenExpires > DateTime.UtcNow);
      if (user == null)
      {
        return BadRequest("Invalid or expired token");
      }

      // If a user exists check if they verified their email
      if (!await _userManager.IsEmailConfirmedAsync(user))
        return Unauthorized("Email is not confirmed");

      user.VerifiedDate = DateTime.Now;
      user.EmailConfirmed = true;
      await _context.SaveChangesAsync();

      return Ok("User Verified :)");
    }

    // Logout
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
      try
      {
        await _signinManager.SignOutAsync();
        return Ok("Logged out successfully");
      }
      catch (Exception ex)
      {
        return BadRequest("Something went wrong, please try again. " + ex.Message);
      }
    }
  }
}