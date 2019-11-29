import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    let token = this._userService.token
    let payload = JSON.parse(atob(token.split('.')[1]))
    let expired = this.isExpired(payload.exp)

    if (expired) {
      this.router.navigate(['/login'])
      return false
    }
    return this.checkAndRenew(payload.exp)
  }

  isExpired(expirationDate: number) {
    let now = new Date().getTime() / 1000 // Divide by 1000 to transform to seconds
    return expirationDate < now
  }

  checkAndRenew(expirationDate: number): Promise<boolean> {
    let tokenExp = new Date(expirationDate * 1000)
    let now = new Date()

    return new Promise((resolve, reject) => {
      now.setTime(now.getTime() + (1 * 60 * 60 * 1000))
      if (tokenExp.getTime() > now.getTime()) {
        return resolve(true)
      } else {
        this._userService.renewToken()
          .subscribe(
            () => { resolve(true) },
            () => {
              this.router.navigate(['/login'])
              reject()
            }
          )
      }
    })
  }

}
