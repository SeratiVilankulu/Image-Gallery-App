using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
  public interface IEmailInterface
  {
    Task SendEmailAsync(string recipient, string subject, string header, string thanks, string message, string ending, string sign);
  }
}