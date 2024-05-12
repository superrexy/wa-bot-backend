import * as fs from 'fs';
import { StringHelper } from './string.helpers';

export class StorageHelpers {
  static deleteFile(path: string) {
    if (StringHelper.isURL(path)) return;

    fs.open(path, (err) => {
      if (err) {
        console.error(err);
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('File deleted successfully');
          }
        });
      }
    });
  }
}
