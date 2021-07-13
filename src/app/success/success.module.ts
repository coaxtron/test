import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { SuccessComponent } from './components/success/success.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    FlexLayoutModule,
  ]
})
export class SuccessModule { }
