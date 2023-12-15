import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, Max, MaxLength,
  Min, MinLength, IsDateString, IsNumber } from 'class-validator';
import { OfferCity, OfferOption, OfferType } from '../../../types/index.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(OfferCity, { message: CreateUpdateOfferMessage.city.invalidValue })
  public city?: OfferCity;

  @IsOptional()
  @MaxLength(256, { message: CreateUpdateOfferMessage.preview.maxLength })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.pictures.invalidFormat })
  @ArrayMinSize(6, { message: CreateUpdateOfferMessage.pictures.invalidSize })
  @ArrayMaxSize(6, { message: CreateUpdateOfferMessage.pictures.invalidSize })
  public pictures?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, {message: CreateUpdateOfferMessage.rating.invalidValue})
  @Max(5, {message: CreateUpdateOfferMessage.rating.invalidValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferMessage.type.invalidValue })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  @Min(1, { message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  @Max(8, { message: CreateUpdateOfferMessage.roomsAmount.invalidValue })
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  @Min(1, { message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  @Max(10, { message: CreateUpdateOfferMessage.guestsAmount.invalidValue })
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferMessage.price.maxValue })
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
