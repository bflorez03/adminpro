import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  compTitle: string;

  constructor(
    private router: Router,
    private webTitle: Title,
    private meta: Meta) {
    this.getDataRow().subscribe(data => {
      this.compTitle = data.title;
      this.webTitle.setTitle(data.title);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.compTitle
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRow() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
