// using Microsoft.AspNetCore.Mvc;
// using MimeKit;
// using MailKit.Net.Smtp;
// using MailKit.Security;
// using System.Threading.Tasks;

// namespace api.Controllers
// {
//   [Route("api/[controller]")]
//   [ApiController]
//   public class EmailController : ControllerBase
//   {
//     [HttpPost("send-verification-email")]
//     // This method sends an email using MailKit
//     public async Task SendEmailAsync(string recipient, string subject, string message)
//     {
//       var emailMessage = new MimeMessage();
//       emailMessage.From.Add(new MailboxAddress("Image Gallery App", "imagegalleryapp@email.com"));
//       emailMessage.To.Add(new MailboxAddress("", recipient));
//       emailMessage.Subject = subject;
//       emailMessage.Body = new TextPart("plain")
//       {
//         Text = message
//       };

//       using (var client = new SmtpClient())
//       {
//         // Connect to MailHog
//         client.Connect("localhost", 1025, SecureSocketOptions.None);
//         await client.SendAsync(emailMessage);
//         client.Disconnect(true);
//       }
//     }
//   }
// }
