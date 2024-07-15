using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;


namespace api.Service
{
  public class EmailService
  {
    public async Task SendEmailAsync(string recipient, string subject, string header, string message, string ending, string sign)
    {
      var emailMessage = new MimeMessage();
      emailMessage.From.Add(new MailboxAddress("Image Gallery App", "Imagegalleryapp@email.com"));
      emailMessage.To.Add(new MailboxAddress("", recipient));
      emailMessage.Subject = subject;
      emailMessage.Body = new TextPart(TextFormat.Html)
      {
        Text = $@"
                    <html>
                    <body>
                        <h1>{header}</h1>
                        <p>{message}</p>
                        <p>{ending}</p>
                        <p>{sign}</p>
                    </body>
                    </html>"
      };

      using (var client = new SmtpClient())
      {
        // Connect to MailHog
        client.Connect("localhost", 1025, SecureSocketOptions.None);
        await client.SendAsync(emailMessage);
        client.Disconnect(true);
      }
    }
  }
}