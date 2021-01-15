import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-products',
  templateUrl: './empty-products.component.html',
  styleUrls: ['./empty-products.component.css']
})
export class EmptyProductsComponent implements OnInit {

  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
