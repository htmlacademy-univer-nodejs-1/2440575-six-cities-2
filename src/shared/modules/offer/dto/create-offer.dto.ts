import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength,
  ArrayMinSize, ArrayMaxSize, IsBoolean, IsNumber } from 'class-validator';
import { OfferCity, OfferOption, OfferType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(OfferCity, { message: CreateOfferValidationMessage.city.invalidValue })
  public city: OfferCity;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.pictures.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.pictures.invalidSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.pictures.invalidSize })
  public pictures: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite: boolean;

  @Min(1, {message: CreateOfferValidationMessage.rating.invalidValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.invalidValue})
  public rating: number;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalidValue })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  @Min(1, { message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsAmount.invalidValue })
  public roomsAmount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  @Min(1, { message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsAmount.invalidValue })
  public guestsAmount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.options.invalidFormat})
  @IsEnum(OfferOption, {each: true, message: CreateOfferValidationMessage.options.invalid})
  public options: OfferOption[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId: string;

  @IsArray({message: CreateOfferValidationMessage.coordinates.invalidFormat})
  @IsNumber({}, {each: true, message: CreateOfferValidationMessage.coordinates.invalidFormat})
  public coordinates: number[];
}
