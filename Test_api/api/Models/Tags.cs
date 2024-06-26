using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
  [Table("Tags")]
  public class Tags
  {
    [Key]
    public int TagID { get; set; }
    public string TagName { get; set; } = string.Empty;

    public List<Images> Images { get; set; } = new List<Images>();
  }
}