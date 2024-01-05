import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength,
  ArrayMinSize, ArrayMaxSize, IsBoolean, IsNumber } from 'class-validator';
import { OfferCity, OfferOption, OfferType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import * as offerConstant from '../offer.constant.js';

export class CreateOfferDto {
  @MinLength(offerConstant.MIN_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(offerConstant.MAX_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(offerConstant.MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(offerConstant.MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(OfferCity, { message: CreateOfferValidationMessage.city.invalidValue })
  public city: OfferCity;

  @MaxLength(offerConstant.MAX_PREVIEW_LENGTH, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.pictures.invalidFormat })
  @ArrayMinSize(offerConstant.MIN_PICTURES_LENGTH, { message: CreateOfferValidationMessage.pictures.invalidSize })
  @ArrayMaxSize(offerConstant.MAX_PICTURES_LENGTH, { message: CreateOfferValidationMessage.pictures.invalidSize })
  public pictures: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @Min(offerConstant.MIN_OFFER_RATING, {message: CreateOfferValidationMessage.rating.invalidValue})
  @Max(offerConstant.MAX_OFFER_RATING, {message: CreateOfferValidationMessage.rating.invalidValue})
  public rating: number;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalidValue })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  @Min(offerConstant.MIN_ROOMS_AMOUNT, { message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  @Max(offerConstant.MAX_ROOMS_AMOUNT, { message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  public roomsAmount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  @Min(offerConstant.MIN_GUESTS_AMOUNT, { message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  @Max(offerConstant.MAX_GUESTS_AMOUNT, { message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  public guestsAmount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(offerConstant.MIN_OFFER_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(offerConstant.MAX_OFFER_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.options.invalidFormat})
  @IsEnum(OfferOption, {each: true, message: CreateOfferValidationMessage.options.invalid})
  public options: OfferOption[];

  public userId: string;

  @IsArray({message: CreateOfferValidationMessage.coordinates.invalidFormat})
  @IsNumber({}, {each: true, message: CreateOfferValidationMessage.coordinates.invalidFormat})
  public coordinates: number[];
}
