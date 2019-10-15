import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.counter().then(
      message => console.log('Promise end: ', message)
    ).catch(error => console.error('Promise error:', error));
  }

  ngOnInit() {
  }

  counter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let count = 0;
      let interval = setInterval(() => {
        count += 1;
        console.log(count);
        if (count === 3) {
          resolve(true);
          // reject('Error occurred!!');
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
