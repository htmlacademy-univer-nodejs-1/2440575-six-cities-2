import { User } from './user.type.js';

export enum OfferCity {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum OfferType {
  Apartment = 'Apartment',
  House = 'House',
  Room = 'Room',
  Hotel = 'Hotel'
}

export enum OfferOption {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: OfferCity;
  preview: string;
  pictures: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomsAmount: number;
  guestsAmount: number;
  price: number;
  options: OfferOption[];
  user: User;
  commentCount: number;
  coordinates: number[];
}
