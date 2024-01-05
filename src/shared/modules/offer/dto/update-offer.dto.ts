import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, Max, MaxLength,
  Min, MinLength, IsDateString, IsNumber } from 'class-validator';
import { OfferCity, OfferOption, OfferType } from '../../../types/index.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';
import * as offerConstant from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(offerConstant.MIN_TITLE_LENGTH, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(offerConstant.MAX_TITLE_LENGTH, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(offerConstant.MIN_DESCRIPTION_LENGTH, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(offerConstant.MAX_DESCRIPTION_LENGTH, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(OfferCity, { message: CreateUpdateOfferMessage.city.invalidValue })
  public city?: OfferCity;

  @IsOptional()
  @MaxLength(offerConstant.MAX_PREVIEW_LENGTH, { message: CreateUpdateOfferMessage.preview.maxLength })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.pictures.invalidFormat })
  @ArrayMinSize(offerConstant.MIN_PICTURES_LENGTH, { message: CreateUpdateOfferMessage.pictures.invalidSize })
  @ArrayMaxSize(offerConstant.MAX_PICTURES_LENGTH, { message: CreateUpdateOfferMessage.pictures.invalidSize })
  public pictures?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @Min(offerConstant.MIN_OFFER_RATING, {message: CreateUpdateOfferMessage.rating.invalidValue})
  @Max(offerConstant.MAX_OFFER_RATING, {message: CreateUpdateOfferMessage.rating.invalidValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.type.invalidValue })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  @Min(offerConstant.MIN_ROOMS_AMOUNT, { message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  @Max(offerConstant.MAX_ROOMS_AMOUNT, { message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  @Min(offerConstant.MIN_GUESTS_AMOUNT, { message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  @Max(offerConstant.MAX_GUESTS_AMOUNT, { message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(offerConstant.MIN_OFFER_PRICE, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(offerConstant.MAX_OFFER_PRICE, { message: CreateUpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateUpdateOfferMessage.options.invalidFormat})
  @IsEnum(OfferOption, {each: true, message: CreateUpdateOfferMessage.options.invalid})
  public options?: OfferOption[];

  @IsOptional()
  @IsArray({message: CreateUpdateOfferMessage.coordinates.invalidFormat})
  @IsNumber({}, {each: true, message: CreateUpdateOfferMessage.coordinates.invalidFormat})
  public coordinates?: number[];
}
