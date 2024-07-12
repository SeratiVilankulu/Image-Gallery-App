using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using api.Data;
using api.Dtos.Account;
using api.Dtos.Password;
using api.Interfaces;
using api.Models;
using Azure.Core;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;

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
    public AccountController(ApplicationDBContext context, UserManager<AppUser> userManager,
    ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
      _context = context;
      _userManager = userManager;
      _tokenService = tokenService;
      _signinManager = signInManager;
    }

    //Post: Account/Register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      // Create a new AppUser object
      var appUser = new AppUser
      {
        UserName = registerDto.UserName,
        Email = registerDto.Email,
      };

      var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

      if (createdUser.Succeeded)
      {
        // Generate a token for the user
        var userToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
        var encodedUserToken = HttpUtility.UrlEncode(userToken);
        if (userToken != null)
        {
          var emailConfirmationLink = $"http://localhost:5085/api/account/emailconfirmation?token={encodedUserToken}&email={appUser.Email}";

          var recipient = registerDto.Email.ToLower();
          var subject = "Email Verification";
          var message = $"Please confirm your account by clicking this link: <a href='{emailConfirmationLink}'>Confirm Email</a>";

          // Send the email
          await SendEmailAsync(recipient, subject, message);

          return Ok("Email was succefully sent, please check emails for confirmation link");
        }
        else
        {
          throw new Exception("Unable to generate email confirmation token");
        }

      }
      return BadRequest("Error Occured. Unable to send email");
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

    [HttpPost("send-verification-email")]
    // This method sends an email using MailKit
    public async Task SendEmailAsync(string recipient, string subject, string message)
    {
      var emailMessage = new MimeMessage();
      emailMessage.From.Add(new MailboxAddress("Image Gallery App", "imagegalleryapp@email.com"));
      emailMessage.To.Add(new MailboxAddress("", recipient));
      emailMessage.Subject = subject;
      emailMessage.Body = new TextPart(TextFormat.Html)
      {
        Text = message
      };

      using (var client = new SmtpClient())
      {
        // Connect to MailHog
        client.Connect("localhost", 1025, SecureSocketOptions.None);
        await client.SendAsync(emailMessage);
        client.Disconnect(true);
      }
    }

    //Registration Verification (Once user clicks on link)
    [HttpGet("emailconfirmation")]
    public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
    {
      // Fetch the user using email
      var user = await _userManager.FindByEmailAsync(email);
      if (user == null)
        return BadRequest("Invalid Email confirmation Request");

      // Validate if the email confirmation logic token matches specified user
      var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
      if (!confirmResult.Succeeded)
        return BadRequest("Invalid Email confirmation Request");

      // Mark the email as verified
      user.VerifiedDate = DateTime.Now;
      await _context.SaveChangesAsync();

      // Redirect to the login page after successful verification
      return Redirect("http://localhost:3000/email-success");
    }

    // Forgot password
    // [HttpPost("forgotpassword")]
    // public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPassword)
    // {
    //   if (!ModelState.IsValid)
    //     return BadRequest("Invalid email");

    //   // Extract user from the database
    //   var user = await _userManager.FindByEmailAsync(forgotPassword.Email!);
    //   if (user == null)
    //     return BadRequest("Email not found");

    //   var token = await _userManager.GeneratePasswordResetTokenAsync(user);
    //   var param = new Dictionary<string, string?>
    //   {
    //     {"token", token},
    //     {"email", forgotPassword.Email!}
    //   };

    //   var callbackUrl = QueryHelpers.AddQueryString(forgotPassword.ClientUri!, param);
    //   // Email Message
    //   var message = new Message([user.Email], "Reset Password", callbackUrl, null);

    //   await _emailSender.SendEmailAsync(message);

    //   return Ok();
    // }

    //Resetting the users password
    [HttpPost("resetpassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPassword)
    {
      if (!ModelState.IsValid)
        return BadRequest("Invalid email");

      // Extract user from the database
      var user = await _userManager.FindByEmailAsync(resetPassword.Email!);
      if (user == null)
        return BadRequest("Email not found");

      var result = await _userManager.ResetPasswordAsync(user, resetPassword.Token!, resetPassword.NewPassword!);

      if (!result.Succeeded)
      {
        var errors = result.Errors.Select(e => e.Description);
        return BadRequest(new { Errors = errors });
      }

      user.PasswordChangeDate = DateTime.UtcNow;
      await _userManager.UpdateAsync(user);

      return Ok("Password has been reset successfully.");
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