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

// Temporal
import { BoosterComponent } from '../components/booster/booster.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        BoosterComponent,
        DoughnutChartComponent
    ],
    exports : [
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
