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
  filteredList: string[] = [];
  displayedItems: Hotel[] = [];
  searchText: string = '';

  pageSize: number = 10;
  currentPage: number = 0;
  loading: boolean = false;
  constructor() { }

  // ngOnInit(): void {

  //   this.hotelsList = [...this.originalHotelList];
  // }

  ngOnInit() {
    // this.hotelsList = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    this.hotelsList = [...this.originalHotelList];
    this.loadMore();
  }


  searchHotel() {
    this.currentPage = 0;
    this.displayedItems = [];

    if (!this.location.trim()) {
      this.displayedItems = [...this.originalHotelList];
      return;
    }

    this.hotelsList = this.originalHotelList.filter((hotel: any) => {
      return hotel.name.toLowerCase().includes(this.location.toLowerCase());
    });
    this.loadMore();
  }


  onScroll(event: any) {
    const container = event.target;
    const threshold = 150;

    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;

    if (position > height - threshold && !this.loading && this.displayedItems.length < this.originalHotelList.length) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.loading) return;
    this.loading = true;

    setTimeout(() => {
      this.currentPage++;
      const nextItems = this.hotelsList.slice(0, this.pageSize * this.currentPage);
      this.displayedItems = nextItems;
      this.loading = false;
    }, 1000); // simulate async loading delay

    // this.loading = false;
  }

}
