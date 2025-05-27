import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel, hotelList } from '../dummy-data/HotelsList';
import { GeocodingService } from '../services/geocoding.service';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotelForm: any;
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
  editAddressFlag: boolean = false;
  editBasicInfoFlag: boolean = false;
  // Google Maps coordinates
  lat: number = 0;
  lng: number = 0;

  isCollapsed = false;
  isCollapsed1 = false;

  constructor(private route: ActivatedRoute, private geoService: GeocodingService, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.hotelForm = this.fb.group({
      id: [null],
      shortName: [''],
      name: [''],
      type: [''],
      currency: [''],
      street: [''],
      state: [''],
      country: [''],
      pincode: [''],
      location: [''],
      email: ['', [Validators.email]],
      phone: [''],
      // phone: ['', [Validators.pattern('^[0-9]{10}$')]],
    });

    // Get the hotel by ID
    const hotel = hotelList.find((hotel: any) => hotel.id == this.route.snapshot.params['id']);

    // Patch values to the form if hotel exists
    if (hotel) {
      this.hotelForm.patchValue(hotel);
    }

    this.gethotelCoordinates();
  }


  toggleSection() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleSection1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }

  gethotelCoordinates() {
    this.geoService.getCoordinates(this.hotelForm.get('name')?.value.trim()).subscribe((data: any[]) => {
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

  editAddress() {
    this.editAddressFlag = true;
  }

  editBasicInfo() {
    this.editBasicInfoFlag = true;
  }
  saveBasicInfo() {
    this.editBasicInfoFlag = false;
    // Save the form data to the hotelList
    const hotelId = this.hotelForm.get('id').value;
    const hotelIndex = hotelList.findIndex((hotel: any) => hotel.id == hotelId);
    if (hotelIndex !== -1) {
      hotelList[hotelIndex] = this.hotelForm.value;
    } else {
      // If hotel not found, you might want to handle it differently
      console.error('Hotel not found');
    }
  }

  cancelBasicInfo() {
    this.editBasicInfoFlag = false;
    // Reset the form to the original hotel data
    const hotel = hotelList.find((hotel: any) => hotel.id == this.route.snapshot.params['id']);
    if (hotel) {
      this.hotelForm.patchValue(hotel);
    }
  }

  saveAddress() {
    this.editAddressFlag = false;
    // Save the form data to the hotelList
    const hotelId = this.hotelForm.get('id').value;
    const hotelIndex = hotelList.findIndex((hotel: any) => hotel.id == hotelId);
    if (hotelIndex !== -1) {
      hotelList[hotelIndex] = this.hotelForm.value;
      this.gethotelCoordinates(); // Update coordinates after saving address
    } else {
      // If hotel not found, you might want to handle it differently
      console.error('Hotel not found');
    }
  }

  cancelAddress() {
    this.editAddressFlag = false;
    // Reset the form to the original hotel data
    const hotel = hotelList.find((hotel: any) => hotel.id == this.route.snapshot.params['id']);
    if (hotel) {
      this.hotelForm.patchValue(hotel);
    }
  }
}
