import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferCity, OfferType, UserRank } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_AMOUNT = 1;
const MAX_ROOMS_AMOUNT = 8;

const MIN_GUESTS_AMOUNT = 1;
const MAX_GUESTS_AMOUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const PICTURES_AMOUNT = 6;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const LOCATION = {
  'Paris': {
    'latitude': 48.85661,
    'longitude': 2.351499
  },
  'Cologne': {
    'latitude': 50.938361,
    'longitude': 6.959974
  },
  'Brussels': {
    'latitude': 50.846557,
    'longitude': 4.351697
  },
  'Amsterdam': {
    'latitude': 52.370216,
    'longitude': 4.895168
  },
  'Hamburg': {
    'latitude': 53.550341,
    'longitude': 10.000654
  },
  'Dusseldorf': {
    'latitude': 51.225402,
    'longitude': 6.776314
  }
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate():string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities) as keyof typeof OfferCity;
    const preview = getRandomItem<string>(this.mockData.previewImages);
    const pictures = getRandomItems<string>(this.mockData.offerImages, PICTURES_AMOUNT).join(';');
    const isPremium = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem<string>([OfferType.Apartment, OfferType.House, OfferType.Room, OfferType.Hotel]);
    const roomsAmount = generateRandomValue(MIN_ROOMS_AMOUNT, MAX_ROOMS_AMOUNT).toString();
    const guestsAmount = generateRandomValue(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const options = getRandomItems<string>(this.mockData.options).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userRank = getRandomItem([UserRank.Regular, UserRank.Pro]);
    const location = `${LOCATION[city].longitude};${LOCATION[city].latitude}`;

    return [
      title, description, postDate, city, preview, pictures, isPremium,
      rating, type, roomsAmount, guestsAmount, price, options,
      userName, email, avatarPath, password, userRank, location
    ].join('\t');
  }
}
