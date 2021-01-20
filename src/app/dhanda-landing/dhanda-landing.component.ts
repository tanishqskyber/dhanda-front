import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {SupportService} from './../_api/support.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-dhanda-landing',
  templateUrl: './dhanda-landing.component.html',
  styleUrls: ['./dhanda-landing.component.css']
})
export class DhandaLandingComponent implements OnInit {
  total_store_created:number=0
  total_order_processed:number=0
  total_transaction_credited:number=0
  total_store_impressions:number=0
  enquiryData:any={}
  constructor(private support: SupportService,private spinner:NgxSpinnerService,private toastr: ToastrService) { }

  slides = [
    { img: "assets/img/client/1.jpg" },
    { img: "assets/img/client/2.jpg" },
    { img: "assets/img/client/3.jpg" },
    { img: "assets/img/client/4.jpg" },
    { img: "assets/img/client/5.jpg" },
    { img: "assets/img/client/6.jpg" },
  ];
  
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay":true, "autoplaySpeed":4000};

  ngOnInit(): void {
    this.loadDhandaSummary()
  }

  private loadDhandaSummary(){
    this.support.getDhandaSummary().then(resp=>{
      console.log(resp)
      if(resp['message']=='Home page analytics info!' && resp['status']==200){
        this.total_order_processed=resp['data']['Orders_Processed']
        this.total_store_impressions=parseInt(resp['data']['Store_Impressions'])
        this.total_store_created=resp['data']['Stores_Created']
        this.total_transaction_credited=resp['data']['Transactions']
        console.log(this.total_order_processed,this.total_store_impressions,this.total_store_created,this.total_transaction_credited)
      }else{
        console.log('No Details Found, Something went wrong!')
      }
    },error=>{
      console.log(error)
      console.log('Error Occured!')
    })

  }

  senEnquiry(){
    this.spinner.show()
    this.support.postEnquiry(this.enquiryData).then(resp=>{
      if(resp['message']=='Enquiry added successfully!' && resp['status']==200){
        this.spinner.hide()
        this.enquiryData={}
        this.toastr.success('Your request has been submitted successfully, Our customer executive will get back to you as soon as possible!','Success Message',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.spinner.hide()
        this.toastr.error('Something went wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
      console.log(resp)
    },error=>{
      console.log(error)
      this.spinner.hide()
      this.toastr.error('Failed to send enquiry!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })

  }


  validateMobileNo(value){    
    var k = value.keyCode;
          return ((k >= 48 && k <= 57) || k == 8);
  }


}
