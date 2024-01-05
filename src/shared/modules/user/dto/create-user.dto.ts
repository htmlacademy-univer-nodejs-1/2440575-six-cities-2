import { IsEmail, IsEnum, IsString, IsOptional, Length } from 'class-validator';
import { UserRank } from '../../../types/index.js';
import { CreateUserMessages } from './create-user.messages.js';
import * as userConstant from '../user.constant.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(
    userConstant.MIN_NAME_LENGTH,
    userConstant.MAX_NAME_LENGTH,
    { message: CreateUserMessages.name.lengthField }
  )
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(
    userConstant.MIN_PASSWORD_LENGTH,
    userConstant.MAX_PASSWORD_LENGTH,
    { message: CreateUserMessages.password.lengthField }
  )
  public password: string;

  @IsEnum(UserRank, { message: CreateUserMessages.rank.invalidFormat })
  public rank: UserRank;
}
