import { Component, OnInit } from '@angular/core';
import { Hotel, hotelList } from '../dummy-data/HotelsList';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {

  location: string = '';
hotelsList: Hotel[] = [];
originalHotelList: Hotel[] = hotelList;

  constructor() { }

ngOnInit(): void {

  this.hotelsList = [...this.originalHotelList];
}



  
  GotoLocation() {
    console.log(this.location);
    // Here you can implement the logic to navigate to the selected location
    // For example, you can use Angular Router to navigate to a different component
    // this.router.navigate(['/location', this.location]);
  }

  ChangeLocation() {
    if (!this.location.trim()) {
      this.hotelsList = [...this.originalHotelList];
      return;
    }
  
    this.hotelsList = this.originalHotelList.filter((hotel: any) => {
      return hotel.name.toLowerCase().includes(this.location.toLowerCase());
    });
  }
  


}
