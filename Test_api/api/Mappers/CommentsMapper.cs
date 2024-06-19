using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comments;
using api.Models;

namespace api.Mappers
{
  public static class CommentsMapper
  {
    public static CommentsDto ToCommentsDto(this Comments commentsModel)
    {
      return new CommentsDto
      {
        CommentID = commentsModel.CommentID,
        Comment = commentsModel.Comment,
        CreatedOn = commentsModel.CreatedOn
      };
    }
  }
}