import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {
    let url = URL_SERVICES + '/image';

    if (!img) {
      return url + '/user/noImage';
    }

    if (img.indexOf('http') >= 0) {
      return img;
    }

    switch (type) {
      case 'user':
        url += '/user/' + img;
        break;

      case 'doctor':
        url += '/doctor/' + img;
        break;

      case 'hospital':
        url += '/hospital/' + img;
        break;

      default:
        console.log('Type not valid, only: user, doctor and hospital');
        url += '/user/noImage';
        break;
    }
    return url;
  }

}
