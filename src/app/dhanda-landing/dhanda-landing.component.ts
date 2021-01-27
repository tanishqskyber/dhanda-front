import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {SupportService} from './../_api/support.service'
import { ToastrService } from 'ngx-toastr'
declare const $: any;
@Component({
  selector: 'app-dhanda-landing',
  templateUrl: './dhanda-landing.component.html',
  styleUrls: ['./dhanda-landing.component.css']
})
export class DhandaLandingComponent implements OnInit {
  total_store_created:any="10000+"
  total_order_processed:any="50000+"
  total_transaction_credited:any="20+ "
  total_store_impressions:any="4,00,000"
  enquiryData:any={}
  constructor(private support: SupportService,private spinner:NgxSpinnerService,private toastr: ToastrService) { }

  slides = [
    { img: "assets/img/client/1.jpg",
      name:"Basraj Mani" ,
      designation:"Manufacturer",
      message :"Dhanda App has helped me restart my business"   },
    { img: "assets/img/client/2.jpg",
    name:"Vinod Gupta" ,
    designation:"Sai Frankie Stall",
    message :"Ab koi aur app ki zaroorat nahi, mera pura Dhanda yeh app sey hojata hai"   },
    { img: "assets/img/client/3.jpg",
    name:"Balram Shinde" ,
    designation:"Giriraj Tea Stall",
    message :"This app has been a blessing in disguise."   },
    { img: "assets/img/client/4.jpg",
    name:"Adnan Rassiwala" ,
    designation:"Creative One",
    message :"I run a small business and I feel getting my own online store was necessary. Thanks to the Dhanda App, now I have my own website and that too for free"   },
    { img: "assets/img/client/5.jpg",
    name:"Reshma Shetty" ,
    designation:"Sweet Indulgence Bakery",
    message :"Great interface, love the seamless experience"   },
    { img: "assets/img/client/6.jpg",
    name:"Bhavesh Kampani" ,
    designation:"Rashee Ethnic Wear",
    message :"I have increased my daily orders by 50% due to the Dhanda App"  },
  ];
  
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay":true, "autoplaySpeed":4000};

  ngOnInit(): void {
    //this.loadDhandaSummary()

    $(function () {
      $('.accordion').find('.accordion-title').on('click', function () {
          // Adds Active Class
          $(this).toggleClass('active');
          // Expand or Collapse This Panel
          $(this).next().slideToggle('fast');
          // Hide The Other Panels
          $('.accordion-content').not($(this).next()).slideUp('fast');
          // Removes Active Class From Other Titles
          $('.accordion-title').not($(this)).removeClass('active');
      });
  });
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
