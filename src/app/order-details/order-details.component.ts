import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
id:any;
orderInfo:any={}
orderItems:any=[]
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams["id"];
    this.loadOrderDetails(this.id)
  }

  private loadOrderDetails(id){
    this.spinner.show()
    this.catservice.getOrderbyId(id).then(resp=>{
      this.spinner.hide()
      console.log(resp)
      if(resp['message']=='Order info!'){
        this.orderInfo=resp['data']
        this.orderItems=this.orderInfo['order_items']
      }else{
        this.spinner.hide()
        this.toastr.error('Something went wrong while loading Order Details!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load Order Details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

}
