import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


@NgModule({// Uncomment this unless it's a Standalone component
  imports: [
    CommonModule,
    DashboardComponent,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ]
})
export class DashboardModule { }
