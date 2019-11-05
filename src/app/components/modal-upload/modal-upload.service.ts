import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public type: string;
  public id: string;
  public hide: string = 'hide';
  public emitter = new EventEmitter<any>();

  constructor() { }

  hideModal() {
    this.type = null;
    this.id = null;
    this.hide = 'hide';
  }

  showModal(id: string, type: string) {
    this.id = id;
    this.type = type;
    this.hide = '';
  }
}
