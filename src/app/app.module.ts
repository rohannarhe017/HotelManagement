import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { MatTabsModule } from '@angular/material/tabs';
// import { ChartsModule } from 'ng2-charts';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HotelSearchComponent,
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule, 
    FormsModule,
    MatTabsModule,
    // ChartsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
