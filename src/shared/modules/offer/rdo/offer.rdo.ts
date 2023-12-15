import { Expose, Type } from 'class-transformer';
import { OfferType, OfferOption } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public pictures: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public roomsAmount: number;

  @Expose()
  public guestsAmount: number;

  @Expose()
  public price: number;

  @Expose()
  public options: OfferOption[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
