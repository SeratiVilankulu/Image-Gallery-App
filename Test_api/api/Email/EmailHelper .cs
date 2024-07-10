using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace api.Models
{
  public class EmailHelper
  {
    public bool SendEmail(string userEmail, string confirmationLink)
    {
      MailMessage mailMessage = new MailMessage();
      mailMessage.From = new MailAddress("seratimotla@gmail.com");
      mailMessage.To.Add(new MailAddress(userEmail));

      mailMessage.Subject = "Confirm your email";
      mailMessage.IsBodyHtml = true;
      mailMessage.Body = confirmationLink;

      SmtpClient client = new SmtpClient();
      client.Credentials = new System.Net.NetworkCredential("seratimotla@gmail.com", "akfu swdw skfy uzfn");
      client.Host = "smtp.gmail.com";
      client.Port = 587;

      try
      {
        client.Send(mailMessage);
        return true;
      }
      catch (Exception ex)
      {
        // log exception
      }
      return false;
    }
  }
}