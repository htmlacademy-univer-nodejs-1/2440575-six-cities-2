import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HouseType, City, Facilities, UserRank } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (this.rawData) {
      return this.rawData
        .split('\n')
        .filter((row) => row.trim().length > 0)
        .map((line) => line.split('\t'))
        .map(([title, description, createdDate, city, preview, pictures, isPremium, isFavorite, rating, type, roomsNumber, guestsNumber, price, options, name, email, avatarPath, password, rank, location]) => ({
          title,
          description,
          date: new Date(createdDate),
          city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
          preview,
          pictures: pictures.split(';'),
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseFloat(rating),
          houseType: HouseType[type as 'apartment' | 'room' | 'house' | 'room'],
          roomsNumber: Number.parseInt(roomsNumber, 10),
          guestsNumber: Number.parseInt(guestsNumber, 10),
          price: Number.parseInt(price, 10),
          facilities: options.split(';')
            .map((option) => Facilities[option as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
          user: {
            name,
            email,
            avatar: avatarPath,
            password,
            rank: UserRank[rank as 'regular' | 'pro']
          },
          commentsNumber: 0,
          coordinates: {
            latitude: Number.parseFloat(location.split(';')[0]),
            longitude: Number.parseFloat(location.split(';')[1])
          }
        }));
    } else {
      throw new Error('File was not read');
    }
  }
}
