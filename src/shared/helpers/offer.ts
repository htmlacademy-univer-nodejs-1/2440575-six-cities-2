import { Offer, OfferCity, OfferType, OfferOption, UserRank } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title, description, createdDate, city, preview, pictures, isPremium,
    isFavorite, rating, type, roomsAmount, guestsAmount, price, options,
    userName, email, avatarPath, password, rank, coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: userName,
    email,
    avatarPath,
    password,
    rank: UserRank[rank as keyof typeof UserRank]
  };

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: OfferCity[city as keyof typeof OfferCity],
    preview,
    pictures: pictures.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: OfferType[type as keyof typeof OfferType],
    roomsAmount: Number.parseInt(roomsAmount, 10),
    guestsAmount: Number.parseInt(guestsAmount, 10),
    price: Number.parseInt(price, 10),
    options: options.split(';').map((option) => OfferOption[option as keyof typeof OfferOption]),
    user,
    commentsAmount: 0,
    coordinates: coordinates.split(';').map((coord) => Number(coord)),
  };
}
