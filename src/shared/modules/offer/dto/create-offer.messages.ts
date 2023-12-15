export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO string',
  },
  city: {
    invalidValue: 'city must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  preview: {
    maxLength: 'Maximum preview length 256 symbols',
  },
  pictures: {
    invalidFormat: 'pictures must be an array',
    invalidSize: 'Should be always 6 pictures',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    invalidValue: 'rating must be an integer from 1 to 5',
  },
  type: {
    invalidValue: 'type must be one of: apartment, house, room, hotel',
  },
  roomsAmount: {
    invalidValue: 'roomsAmount must be an integer from 1 to 8',
  },
  guestsAmount: {
    invalidValue: 'guestsAmount must be an integer from 1 to 10',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'Minumum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  options: {
    invalidFormat: 'options must be an array',
    invalid: 'Can includes options: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge'
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'coordinates must be an array',
  },
} as const;
