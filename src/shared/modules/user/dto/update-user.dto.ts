import { UserRank } from '../../../types/index.js';

export class UpdateUserDto {
  public avatarPath?: string;
  public name?: string;
  public type?: UserRank;
  public favorites?: string[];
}
