import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { UserService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imageToUpload: File;
  imageTemp: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService,
    public _userService: UserService) { }

  ngOnInit() {
  }

  selectImage(imageFile: File) {
    if (!imageFile) {
      this.imageToUpload = null;
      return;
    }

    if (imageFile.type.indexOf('image') < 0) {
      swal('Invalid format', 'Selected file is not an image!', 'error');
      this.imageToUpload = null;
      return;
    }
    this.updateImageTemp(imageFile);
    this.imageToUpload = imageFile;
  }

  updateImageTemp(imageFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => this.imageTemp = reader.result as string;
  }

  saveImage() {
    this._uploadFileService.uploadFile(this.imageToUpload, this._modalUploadService.type,
      this._modalUploadService.id)
      .then((res: any) => {
        // Update local storage if the logged user and profile picture update are the same
        if (res.element._id === this._userService.user._id) {
          this._userService.user.img = res.element.img;
          this._userService.saveLocalStorage(res.element._id,
            this._userService.token, res.element);
        }
        swal('Picture updated', res.element.name, 'success');
        this._modalUploadService.emitter.emit(res);
        this.closeModal();
      })
      .catch(err => console.log(err));
  }

  closeModal() {
    this.imageTemp = null;
    this.imageToUpload = null;
    this._modalUploadService.hideModal();
  }

}
