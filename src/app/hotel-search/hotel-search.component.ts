import { Component, OnInit } from '@angular/core';
import { Hotel, hotelList } from '../dummy-data/HotelsList';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {

  // locations: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  location: string = '';
  hotelsList: Hotel[] = hotelList;
  constructor() { }

  ngOnInit(): void {
  }

  GotoLocation() {
    console.log(this.location);
    // Here you can implement the logic to navigate to the selected location
    // For example, you can use Angular Router to navigate to a different component
    // this.router.navigate(['/location', this.location]);
  }


  ChangeLocation() {
    debugger;
    this.hotelsList = this.hotelsList.filter((hotel: any) => {
      return hotel.name.toLowerCase().includes(this.location.toLowerCase())
    })

  }

}
