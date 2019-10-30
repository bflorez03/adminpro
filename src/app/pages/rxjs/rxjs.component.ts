import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // This variable allows subscribe and unsubscribe to an observable
  // in this component
  subscription: Subscription;

  constructor() {
    // subscription get a reference from Observable
    this.subscription = this.getObservable()
      .pipe(retry(2))
      .subscribe(
        response => console.log('Subs: ', response),
        error => console.error('Error: ', error),
        () => console.log('Complete!!')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Closing component.');
    // subscription unsubscribe from Observable
    this.subscription.unsubscribe();
  }

  getObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        const output = { value: counter };
        observer.next(output);
      }, 1000);
    }).pipe(
      map(resp => resp.value),
      filter((value, index) => {
        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
