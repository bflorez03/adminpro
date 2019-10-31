import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  imageToUpload: File;
  imageTemp: string;

  constructor(
    public _userService: UserService) {
    this.user = _userService.user;
  }

  ngOnInit() {
  }

  // Update user information
  save(user: User) {
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this.user.name = user.name;
    this._userService.updateUser(this.user)
      .subscribe(res => console.log(res));
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

  // Update image on the backend
  uploadImage = () => this._userService.updateImage(this.imageToUpload, this.user._id);

  // Update and show imageTemp on the frontend
  updateImageTemp(imageFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => this.imageTemp = reader.result as string;
  }
}
