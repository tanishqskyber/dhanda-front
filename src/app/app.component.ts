import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dhanda';
  cartcounter : any = 0;

  ngOnInit(){
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
