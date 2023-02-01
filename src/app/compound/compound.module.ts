import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompoundRoutingModule } from './compound-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CompoundRoutingModule,
    MaterialModule
  ]
})
export class CompoundModule { }
