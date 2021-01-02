import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title = 'dhanda';
  cartcounter : any = 0;
  constructor() { }

  ngOnInit(): void {
    $("#bottom-menu a").on('click', function () {
      $("#bottom-menu a").removeClass('active');
      $(this).addClass('active');
   });
  }
  checkCart() {
    console.log("count called");
    this.cartcounter = localStorage.getItem('cart');
  }
}
