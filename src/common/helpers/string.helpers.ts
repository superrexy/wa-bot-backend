import { Str } from '@jimuelpalaca/str';
import Slugify from 'slugify';

export class StringHelper {
  static slug(str: string, withRandom = true) {
    return Slugify(`${str} ${withRandom ? Str.random(6) : ''}`, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  static random(length = 6) {
    return Str.random(length);
  }

  static isURL(path: string) {
    const regex = new RegExp(
      '^https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.' +
        '[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.' +
        '[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.' +
        '[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,}$',
      'i',
    );

    return regex.test(path);
  }
}
