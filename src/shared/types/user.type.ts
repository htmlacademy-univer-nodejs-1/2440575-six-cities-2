export enum UserRank {
  regular = 'regular',
  pro = 'pro'
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  rank: UserRank;
}
