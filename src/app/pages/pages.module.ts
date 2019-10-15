/*  Modules and declarations of pages folder and its components */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// ng2-chart
import { ChartsModule } from 'ng2-charts';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Temporal
import { BoosterComponent } from '../components/booster/booster.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        BoosterComponent,
        DoughnutChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }
