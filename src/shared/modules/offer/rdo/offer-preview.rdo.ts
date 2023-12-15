import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose()
  public commentCount: number;
}
