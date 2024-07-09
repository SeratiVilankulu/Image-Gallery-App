using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmailController : ControllerBase
  {
    [HttpPost("send-verification-email")]
    public async Task<IActionResult> SendVerificationEmail(string email, string token)
    {
      try
      {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Image Gallery App", "seratimotla@gmail.com")); // Replace with your email
        message.To.Add(new MailboxAddress("Recipient", email));
        message.Subject = "Email Verification";
        message.Body = new TextPart("plain")
        {
          Text = $"Please verify your email by clicking the following link: " +
                 $"https://yourdomain.com/verify?token={token}"
        };

        using (var client = new SmtpClient())
        {
          client.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

          await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
          await client.AuthenticateAsync("seratimotla@gmail.com", "akfu swdw skfy uzfn"); // Use Gmail and App Password
          await client.SendAsync(message);
          await client.DisconnectAsync(true);

          return Ok("Verification email sent successfully");
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Failed to send email. Error: {ex.Message}");
      }
    }
  }
}
