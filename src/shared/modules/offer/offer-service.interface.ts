import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto, OfferEntity } from './index.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]>
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  findByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  getDetailedOffer(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]>;
  findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;
  updateAverageRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  addFavorite(offerId: string, userId: string): Promise<void>;
  deleteFavorite(offerId: string, userId: string): Promise<void>;
}
