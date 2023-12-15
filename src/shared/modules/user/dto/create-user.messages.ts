export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'avatarPath must be a string',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  rank: {
    invalidFormat: 'type must be Normal or Pro',
  }
} as const;
