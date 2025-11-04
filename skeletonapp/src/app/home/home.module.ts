import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

// Angular Material imports para MatDatepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Para formularios reactivos
    IonicModule,
    HomePageRoutingModule,
    // Angular Material modules para DatePicker
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
