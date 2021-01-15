import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css']
})
export class EmptyCartComponent implements OnInit {
  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
