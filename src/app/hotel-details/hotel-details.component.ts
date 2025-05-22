import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel, hotelList } from '../dummy-data/HotelsList';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotelDetails: Hotel[] = [];
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    { data: [30, 75, 90, 55, 40, 70, 30, 80, 90, 40, 60, 85], label: 'Bookings' }
  ];

  // Google Maps coordinates
  lat = 36.897682;
  lng = 30.713323;

  // center = { lat: 36.897682, lng: 30.713323 }; // Antalya, TR from the map
  isCollapsed = false;
  isCollapsed1 = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    let hotelID = this.route.snapshot.params['id'];
    this.hotelDetails = hotelList.filter((hotel: any) => {
      return hotel.id == hotelID;
    });

  }

  toggleSection() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleSection1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }

}
