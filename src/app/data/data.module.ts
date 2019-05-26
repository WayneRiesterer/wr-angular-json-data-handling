import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from '../data/data.service';
import { DataComponent } from './data/data.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [DataComponent],
  declarations: [DataComponent],
  providers: [DataService]
})
export class DataModule { }
