import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto, CreateOfferDto } from './index.js';
import { UserEntity } from '../user/user.entity.js';
import { DEFAULT_OFFER_AMOUNT, PREMIUM_OFFER_AMOUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().limit(DEFAULT_OFFER_AMOUNT).populate('userId').exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('userId').exec();
  }

  public async getDetailedOffer(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    let result = await this.offerModel.aggregate<DocumentType<OfferEntity>>([
      { $match: { $expr: { $eq: [offerId, { $toString: '$_id'}] } } },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { $expr: { $eq: [userId, { $toString: '$_id'}] } } },
            { $project: {_id: false, favorites: true}}
          ],
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          isFavorite: {
            $cond:
              [
                {$and:
                  [
                    {$ne: [{ $type: '$user.favorites'}, 'missing']},
                    {$in: ['$_id', '$user.favorites']}
                  ]
                },
                true,
                false
              ]
          },
          id: { $toString: '$_id'}
        }
      },
      { $unset: 'user' },
    ]).exec();

    result = await this.offerModel.populate(result, {path: 'userId'});
    const offer = result[0];
    return offer;
  }

  public async findByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ city }).populate('userId').exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).populate('userId').exec();
  }

  public async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .populate('userId')
      .limit(PREMIUM_OFFER_AMOUNT)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  // TODO
  public async findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: userId } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
            { $project: { _id: 0, favorites: 1 } },
          ],
          as: 'users',
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$users', 0] },
        },
      },
      {
        $unset: ['users'],
      },
      {
        $match: {
          $expr: {
            $in: ['$_id', '$user.favorites'],
          },
        },
      },
    ]).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {'$inc': { commentCount: 1 }}).exec();
  }

  public async updateAverageRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {$match: {$expr: { $eq: ['$_id', {$toObjectId: offerId}] }}},
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              {$match: {$expr: { $eq: ['$$offerId', '$offerId'] }}},
            ],
            as: 'comments',
          },
        },
        {$set: {rating: { $avg: '$comments.rating' }}},
        {$unset: 'comments'},
      ])
      .exec()
      .then(([result]) => result ?? null);
  }

  public async addFavorite(offerId: string, userId: string): Promise<void> {
    await this.userModel.updateOne(
      {_id: userId},
      { $addToSet: { favorites: offerId } }
    );
  }

  public async deleteFavorite(offerId: string, userId: string): Promise<void> {
    await this.userModel.updateOne(
      {_id: userId},
      { $pull: { favorites: offerId } }
    );
  }
}
