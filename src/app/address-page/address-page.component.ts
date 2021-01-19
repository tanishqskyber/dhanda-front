import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.css']
})
export class AddressPageComponent implements OnInit {
  addressData:any=[]
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAddressData();
  }

  private loadAddressData(){
    this.spinner.show()
    this.catservice.getAddress().then(resp=>{
      console.log(resp)
      if(resp['message']=='Customer address list!'){
        this.spinner.hide()
        this.addressData=resp['data']
      }else if(resp['message']=='Customer address not found!'){
        this.spinner.hide()
        this.toastr.warning('There are no saved delivery address!','Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
      else{
        this.spinner.hide()
        this.toastr.error('Something Went Wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
      
    },error=>{
      this.spinner.hide()
      console.log(error)
    })
  }

  addNewAddress(){
    this.router.navigate([ '/new-address']);
  }

  chnageAddress(id){
    console.log(id)
  }

}
