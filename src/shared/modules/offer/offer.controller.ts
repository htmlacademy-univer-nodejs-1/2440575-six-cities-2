import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod, ValidateObjectIdMiddleware, ValidateDtoMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService, CommentRdo } from '../comment/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register loggers for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `${params.offerId} is not a valid ID`, 'OfferController');
    }
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${params.offerId} does not exist`, 'OfferController');
    }
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({params, body}: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const {offerId} = params;
    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'parameter offerId was not found in request', 'OfferController');
    }
    const updatedOffer = await this.offerService.updateById(offerId, body);
    if (!updatedOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${params.offerId} was not found`, 'OfferController');
    }
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Offer id must be defined', 'OfferController');
    }
    const offer = await this.offerService.deleteById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found`, 'OfferController');
    }
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${params.offerId} not found.`, 'OfferController');
    }
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
