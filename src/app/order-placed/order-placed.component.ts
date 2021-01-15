import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
