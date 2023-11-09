import { UserRank } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath?: string;
  public password: string;
  public rank: UserRank;
}
