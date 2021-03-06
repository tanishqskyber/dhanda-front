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
  params:any;
  stateData:any=[]
  cityData:any=[]
  showgetAddressOption:boolean=false;
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.params=this.activatedRoute.snapshot.queryParams["id"];
    if(this.params!=undefined){
      this.showgetAddressOption=true
    }else{
      this.showgetAddressOption=false
    }
    this.loadAddressData();
  }

  private loadAddressData(){
    this.spinner.show()

    this.catservice.getAddress(localStorage.getItem('contact-no')).then(resp=>{
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


  addressdelete(id){
    this.spinner.show()
    this.catservice.deleteAddress(id).then(resp=>{
      console.log(resp)
      if(resp['message']=='Customer address remove successfully!'){
        this.loadAddressData()
      }else{
        this.spinner.hide()
        this.toastr.error('Something went wrong while deleting address!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to delete address!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }


  gotoEditAddress(id){
    this.router.navigate(['/new-address'],{queryParams:{id:id}})
  }

  getAddress(address){
    localStorage.setItem('selectedAddress',JSON.stringify(address))
    this.router.navigate(['/checkout']);
  }


}
