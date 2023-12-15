import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto, OfferEntity } from './index.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]>
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorite(cityName: string): Promise<DocumentType<OfferEntity>[]>;
  updateAverageRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
