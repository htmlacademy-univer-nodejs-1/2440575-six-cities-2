import { IsString, Length, IsInt, Min, Max } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import * as commentConstant from '../comment.constant.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(
    commentConstant.MIN_COMMENT_LENGTH,
    commentConstant.MAX_COMMENT_LENGTH,
    { message: 'min is 5, max is 1024 '}
  )
  public text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(commentConstant.MIN_COMMENT_RATING , { message: CreateCommentMessages.rating.minValue })
  @Max(commentConstant.MAX_COMMENT_RATING, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  public offerId: string;

  public userId: string;
}
