export enum UserRank {
  Regular = 'Regular',
  Pro = 'Pro'
}

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  rank: UserRank;
}
