import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {CategoryService} from '../../_api/category.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title = 'dhanda';
  cartcounter : any = 0;
  cartData:any=[]
  constructor(private catservice:CategoryService) { }

  ngOnInit(): void {
    $("#bottom-menu a").on('click', function () {
      $("#bottom-menu a").removeClass('active');
      $(this).addClass('active');
   });
   this.loadCartDetails()
  }
  // checkCart() {
  //   console.log("count called");
  //   this.cartcounter = localStorage.getItem('cart');
  // }

loadCartDetails(){
  
    this.catservice.getCartList().then(resp=>{
  
      if(resp['message']=='Record not found!' && resp['status']==404){
            console.log('Not Record in Cart')
            this.cartcounter=0;
          
      }else if(resp['message']=='Cart info!' && resp['status']==200){
      
        this.cartData=resp['data']
      
       this.cartcounter=this.cartData.length

      }else{
      console.log("Something Went Wrong")
      this.cartcounter=0;
      }
    },error=>{
      this.cartcounter=0;
      console.log(error)
     
    })
  }
}
