import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: string) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    const url = URL_SERVICES + '/update/' + type + '/' + id;

    return new Promise((resolve, reject) => {
      formData.append('image', file, file.name);
      xhr.open('PUT', url, true);
      xhr.send(formData);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Error uploading image');
            reject(xhr.response);
          }
        }
      };
    });
  }
}
