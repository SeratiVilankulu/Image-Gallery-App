using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Tags;
using api.Models;

namespace api.Mappers
{
  public static class TagsMapper
  {
    public static TagsDto ToTagsDto(this Tags tagsModel)
    {
      return new TagsDto
      {
        TagName = tagsModel.TagName
      };
    }

    public static Tags ToTagsFromCreateDto(this CreateTagsRequestDto tagsDto)
    {
      return new Tags
      {
        TagName = tagsDto.TagName
      };
    }
  }
}