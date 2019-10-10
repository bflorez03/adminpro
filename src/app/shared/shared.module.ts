import { NgModule } from '@angular/core';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        PagenotfoundComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        PagenotfoundComponent
    ]
})
export class SharedModule { }
