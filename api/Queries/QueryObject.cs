using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Queries
{
  public class QueryObject
  {
    public string? CategoryType { get; set; } = null;
    public int? Total { get; set; } = null;
    public string? SortBy { get; set; } = null;
    public bool IsDecsending { get; set; } = false;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }
}