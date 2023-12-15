import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.js';
import { HttpError } from '../../libs/rest/errors/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register loggers for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getDetailed });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async getDetailed({ params }: Request, res: Response): Promise<void> {
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

  public async update({params, body}: Request, res: Response): Promise<void> {
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

  public async delete({params}: Request, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Offer id must be defined', 'OfferController');
    }

    const offer = await this.offerService.exists(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} does not exist`, 'OfferController');
    }

    await this.offerService.deleteById(offerId);
    this.noContent(res, null);
  }
}
