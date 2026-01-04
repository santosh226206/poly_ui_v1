import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    CommonModule,
    SigninComponent,
    RouterModule.forChild([{ path: '', component: SigninComponent }])
  ]
})
export class SigninModule {}
