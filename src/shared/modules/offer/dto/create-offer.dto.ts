import { OfferCity, OfferOption, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: OfferCity;
  public preview: string;
  public pictures: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public roomsAmount: number;
  public guestsAmount: number;
  public price: number;
  public options: OfferOption[];
  public user: string;
  public commentsAmount: number;
  public coordinates: number[];
}
