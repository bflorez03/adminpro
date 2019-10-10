import { NgModule } from '@angular/core';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component
    ],
    exports : [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }
