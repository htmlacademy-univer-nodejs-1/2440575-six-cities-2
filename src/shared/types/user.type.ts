export enum UserRank {
  Regular = 'Regular',
  Pro = 'Pro'
}

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  rank: UserRank;
}
