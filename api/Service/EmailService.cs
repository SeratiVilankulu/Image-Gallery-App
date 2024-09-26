using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using System.Net.Mail;
using System.Net;
using MimeKit;

namespace api.Service
{
  public class EmailService : IEmailInterface
  {
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
      _configuration = configuration;
      _logger = logger;
    }
    public async Task SendEmailAsync(string recipient, string subject, string header, string thanks, string message, string ending, string sign)
    {
      var smtpHost = _configuration["EmailConfiguration:Host"];
      var smtpPortString = _configuration["EmailConfiguration:Port"];
      var smtpUsername = _configuration["EmailConfiguration:Username"];
      var smtpPassword = _configuration["EmailConfiguration:Password"];
      var smtpFrom = _configuration["EmailConfiguration:From"];

      var emailMessage = new MailMessage();
      emailMessage.To.Add(recipient);
      emailMessage.From = new MailAddress(smtpFrom);
      emailMessage.Subject = subject;
      emailMessage.Body = $@"
                    <html>
                    <body>
                        <h1>{header}</h1>
                        <p>{thanks}</p>
                        <p>{message}</p>
                        <p>{ending}</p>
                        <p>{sign}</p>
                    </body>
                    </html>";

      emailMessage.IsBodyHtml = true;

      using (var smtpClient = new SmtpClient(smtpHost))
      {
        smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
        smtpClient.Port = 587;
        await smtpClient.SendMailAsync(emailMessage);
      }
    }
  }
}