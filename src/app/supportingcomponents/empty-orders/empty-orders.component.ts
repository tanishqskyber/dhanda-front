import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-orders',
  templateUrl: './empty-orders.component.html',
  styleUrls: ['./empty-orders.component.css']
})
export class EmptyOrdersComponent implements OnInit {

  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
