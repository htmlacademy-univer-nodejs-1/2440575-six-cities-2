import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferCity, OfferType, OfferOption } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({ required: true, type: () => String, enum: OfferCity })
  public city!: OfferCity;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true, type: () => [String], default: []})
  public pictures!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true })
  public rating!: string;

  @prop({ required: true, type: () => String, enum: OfferType })
  public type!: OfferType;

  @prop({ required: true, default: 1 })
  public roomsAmount!: number;

  @prop({ required: true, default: 1 })
  public guestsAmount!: number;

  @prop({ required: true, default: 100 })
  public price!: number;

  @prop({ required: true, type: () => String, enum: OfferOption, default: [] })
  public options!: OfferOption[];

  @prop({ required: true, ref: UserEntity, _id: false })
  public user!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsAmount!: number;

  @prop({ required: true, type: () => [Number] })
  public location!: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
