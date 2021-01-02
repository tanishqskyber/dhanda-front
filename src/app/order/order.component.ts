import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import { error } from 'protractor';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderData:any=[]
  search:any;
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.loadOrders()
  }

  private loadOrders(){
    this.spinner.show()
    this.catservice.getOrders().then(resp=>{
      
      console.log(resp)
      if(resp['message']=='Order info!'){
        this.spinner.hide()
        this.orderData=resp['data']['sanitized_orders_data']
      }else{
        this.spinner.hide()
        this.toastr.error('Something went wrong while loading Orders!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load Orders!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

  gotoDetails(oid){
    this.router.navigate(['/order-details'],{queryParams:{id:oid}});
  }
 

}
