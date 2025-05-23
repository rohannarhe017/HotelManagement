import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel, hotelList } from '../dummy-data/HotelsList';
import { GeocodingService } from '../services/geocoding.service';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotelDetails: Hotel;
  @ViewChild('mapIframe', { static: false }) mapIframe!: ElementRef<HTMLIFrameElement>;

  chartType: any = 'bar';
  chartData = [
    { data: [45, 37, 60, 70, 46, 33, 45, 37, 60, 70, 46, 93], barThickness: 20, backgroundColor: '#0099b1', hoverBackgroundColor: '#0099b1' },
  ];
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  chartOptions = {
    responsive: true,
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            fontColor: '#0099b1'
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: '#00475a'
          }
        }
      ]
    }
  };
  chartYear: number = 2023;

  // Google Maps coordinates
  lat: number = 0;
  lng: number = 0;

  isCollapsed = false;
  isCollapsed1 = false;

  constructor(private route: ActivatedRoute, private geoService: GeocodingService) {
    let hotelID = this.route.snapshot.params['id'];
    this.hotelDetails = hotelList.filter((hotel: any) => {
      return hotel.id == hotelID;
    })[0];
  }

  ngOnInit(): void {
    this.gethotelCoordinates();
  }


  toggleSection() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleSection1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }


  gethotelCoordinates() {
    this.geoService.getCoordinates(this.hotelDetails.name.trim()).subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.lat = parseFloat(data[0].lat);
        this.lng = parseFloat(data[0].lon);
        const url = `https://www.google.com/maps?q=${this.lat},${this.lng}&z=14&output=embed`;
        this.mapIframe.nativeElement.src = url;
      } else {
        const url = `https://www.google.com/maps?q=${this.lat},${this.lng}&z=14&output=embed`;
        this.mapIframe.nativeElement.src = url;
        console.log('Place not found');
      }
    });
  }
}
