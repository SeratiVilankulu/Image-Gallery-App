using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("Categories")]
  public class Categories
  {
    [Key]
    public int CategoryID { get; set; }
    public string CategoryType { get; set; } = string.Empty;
    public int Total { get; set; }
    public List<Images> Images { get; set; } = new List<Images>();
  }
}
