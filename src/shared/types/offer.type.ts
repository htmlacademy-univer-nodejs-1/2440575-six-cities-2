import { User } from './user.type.js';

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum HouseType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum Facilities {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

type Coordinates = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  preview: string;
  pictures: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: HouseType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  facilities: Facilities[];
  user: User;
  commentsNumber: number;
  coordinates: Coordinates;
}
